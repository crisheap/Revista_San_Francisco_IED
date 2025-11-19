const express = require('express');
const jwt = require('jsonwebtoken');
const database = require('../database');

const router = express.Router();

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de acceso requerido'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};

// Obtener todos los artículos (públicos o según rol)
router.get('/', async (req, res) => {
    try {
        const { status, category, chapter, page = 1, limit = 10 } = req.query;
        
        let query = `
            SELECT a.*, u.name as author_name 
            FROM revista_digital.articles a 
            JOIN revista_digital.users u ON a.author_id = u.id 
            WHERE 1=1
        `;
        const params = [];
        let paramCount = 0;

        // Filtros para usuarios no autenticados (solo artículos publicados)
        if (!req.headers.authorization) {
            query += ` AND a.status = 'published'`;
        } else {
            // Verificar token para usuarios autenticados
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;

                // Estudiantes solo ven sus artículos o publicados
                if (req.user.role === 'student') {
                    query += ` AND (a.author_id = $${++paramCount} OR a.status = 'published')`;
                    params.push(req.user.id);
                }
                // Padres solo ven artículos publicados
                else if (req.user.role === 'parent') {
                    query += ` AND a.status = 'published'`;
                }
            } catch (error) {
                // Si el token es inválido, mostrar solo artículos publicados
                query += ` AND a.status = 'published'`;
            }
        }

        // Aplicar filtros adicionales
        if (status && status !== 'all') {
            query += ` AND a.status = $${++paramCount}`;
            params.push(status);
        }

        if (category && category !== 'all') {
            query += ` AND a.category = $${++paramCount}`;
            params.push(category);
        }

        if (chapter && chapter !== 'all') {
            query += ` AND a.chapter = $${++paramCount}`;
            params.push(chapter);
        }

        query += ` ORDER BY a.created_at DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
        params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

        const result = await database.query(query, params);
        
        res.json({
            success: true,
            articles: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                hasMore: result.rows.length === parseInt(limit)
            }
        });

    } catch (error) {
        console.error('❌ Error obteniendo artículos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener artículo por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await database.query(`
            SELECT a.*, u.name as author_name 
            FROM revista_digital.articles a 
            JOIN revista_digital.users u ON a.author_id = u.id 
            WHERE a.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Artículo no encontrado'
            });
        }

        const article = result.rows[0];

        // Verificar permisos para artículos no publicados
        if (article.status !== 'published') {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para ver este artículo'
                });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
                // Solo autores, docentes y admins pueden ver artículos no publicados
                if (decoded.role !== 'teacher' && decoded.role !== 'admin' && article.author_id !== decoded.id) {
                    return res.status(403).json({
                        success: false,
                        message: 'No tienes permisos para ver este artículo'
                    });
                }
            } catch (error) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para ver este artículo'
                });
            }
        }

        // Obtener comentarios del artículo
        const commentsResult = await database.query(`
            SELECT c.*, u.name as author_name 
            FROM revista_digital.comments c 
            JOIN revista_digital.users u ON c.author_id = u.id 
            WHERE c.article_id = $1 
            ORDER BY c.created_at ASC
        `, [id]);

        res.json({
            success: true,
            article: {
                ...article,
                comments: commentsResult.rows
            }
        });

    } catch (error) {
        console.error('❌ Error obteniendo artículo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Crear nuevo artículo
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, category, chapter, content, status = 'draft' } = req.body;

        if (!title || !category || !chapter || !content) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        const result = await database.query(`
            INSERT INTO revista_digital.articles 
            (title, category, chapter, content, author_id, status) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `, [title, category, chapter, content, req.user.id, status]);

        const newArticle = result.rows[0];

        // Crear notificación si se envía para revisión
        if (status === 'pending') {
            await database.query(`
                INSERT INTO revista_digital.notifications 
                (user_id, title, content, type, link) 
                SELECT id, '📝 Nuevo artículo pendiente', $1, 'warning', '/pending-articles'
                FROM revista_digital.users 
                WHERE role IN ('teacher', 'admin')
            `, [`"${title}" está esperando revisión`]);
        }

        res.status(201).json({
            success: true,
            message: status === 'pending' ? 'Artículo enviado para revisión' : 'Artículo guardado como borrador',
            article: newArticle
        });

    } catch (error) {
        console.error('❌ Error creando artículo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar artículo
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, chapter, content, status } = req.body;

        // Verificar que el artículo existe y pertenece al usuario
        const articleResult = await database.query(
            'SELECT * FROM revista_digital.articles WHERE id = $1',
            [id]
        );

        if (articleResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Artículo no encontrado'
            });
        }

        const article = articleResult.rows[0];

        // Verificar permisos (solo autor, docentes o admins pueden editar)
        if (article.author_id !== req.user.id && req.user.role !== 'teacher' && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para editar este artículo'
            });
        }

        const result = await database.query(`
            UPDATE revista_digital.articles 
            SET title = $1, category = $2, chapter = $3, content = $4, status = $5, updated_at = CURRENT_TIMESTAMP
            WHERE id = $6 
            RETURNING *
        `, [title, category, chapter, content, status, id]);

        // Crear notificación si cambia a pendiente
        if (status === 'pending' && article.status !== 'pending') {
            await database.query(`
                INSERT INTO revista_digital.notifications 
                (user_id, title, content, type, link) 
                SELECT id, '📝 Artículo pendiente actualizado', $1, 'warning', '/pending-articles'
                FROM revista_digital.users 
                WHERE role IN ('teacher', 'admin')
            `, [`"${title}" ha sido actualizado y está esperando revisión`]);
        }

        res.json({
            success: true,
            message: 'Artículo actualizado exitosamente',
            article: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error actualizando artículo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Eliminar artículo
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que el artículo existe
        const articleResult = await database.query(
            'SELECT * FROM revista_digital.articles WHERE id = $1',
            [id]
        );

        if (articleResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Artículo no encontrado'
            });
        }

        const article = articleResult.rows[0];

        // Verificar permisos (solo autor o admins pueden eliminar)
        if (article.author_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para eliminar este artículo'
            });
        }

        await database.query('DELETE FROM revista_digital.articles WHERE id = $1', [id]);

        res.json({
            success: true,
            message: 'Artículo eliminado exitosamente'
        });

    } catch (error) {
        console.error('❌ Error eliminando artículo:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;