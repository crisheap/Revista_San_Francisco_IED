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

// Obtener comentarios de un artículo
router.get('/article/:articleId', async (req, res) => {
    try {
        const { articleId } = req.params;

        const result = await database.query(`
            SELECT c.*, u.name as author_name 
            FROM revista_digital.comments c 
            JOIN revista_digital.users u ON c.author_id = u.id 
            WHERE c.article_id = $1 
            ORDER BY c.created_at ASC
        `, [articleId]);

        res.json({
            success: true,
            comments: result.rows
        });

    } catch (error) {
        console.error('❌ Error obteniendo comentarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Agregar comentario
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { articleId, content } = req.body;

        if (!articleId || !content) {
            return res.status(400).json({
                success: false,
                message: 'Artículo y contenido son requeridos'
            });
        }

        // Verificar que el artículo existe y está publicado
        const articleResult = await database.query(
            'SELECT * FROM revista_digital.articles WHERE id = $1',
            [articleId]
        );

        if (articleResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Artículo no encontrado'
            });
        }

        const article = articleResult.rows[0];

        if (article.status !== 'published') {
            return res.status(403).json({
                success: false,
                message: 'Solo se pueden comentar artículos publicados'
            });
        }

        const result = await database.query(`
            INSERT INTO revista_digital.comments (article_id, author_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [articleId, req.user.id, content]);

        const newComment = result.rows[0];

        // Crear notificación para el autor del artículo (si no es el mismo)
        if (article.author_id !== req.user.id) {
            await database.query(`
                INSERT INTO revista_digital.notifications 
                (user_id, title, content, type, link) 
                VALUES ($1, $2, $3, $4, $5)
            `, [
                article.author_id,
                '💬 Nuevo comentario',
                `Tu artículo "${article.title}" tiene un nuevo comentario`,
                'info',
                `/article/${articleId}`
            ]);
        }

        // Obtener información del autor para la respuesta
        const authorResult = await database.query(
            'SELECT name FROM revista_digital.users WHERE id = $1',
            [req.user.id]
        );

        res.status(201).json({
            success: true,
            message: 'Comentario agregado exitosamente',
            comment: {
                ...newComment,
                author_name: authorResult.rows[0].name
            }
        });

    } catch (error) {
        console.error('❌ Error agregando comentario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Eliminar comentario
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que el comentario existe
        const commentResult = await database.query(
            'SELECT * FROM revista_digital.comments WHERE id = $1',
            [id]
        );

        if (commentResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        const comment = commentResult.rows[0];

        // Verificar permisos (solo autor del comentario o admin pueden eliminar)
        if (comment.author_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para eliminar este comentario'
            });
        }

        await database.query('DELETE FROM revista_digital.comments WHERE id = $1', [id]);

        res.json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });

    } catch (error) {
        console.error('❌ Error eliminando comentario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;