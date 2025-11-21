import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Obtener todos los artículos (con filtros)
router.get('/', async (req, res) => {
    try {
        const { status, category, chapter, author_id } = req.query;
        
        let whereClause = 'WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (status && status !== 'all') {
            paramCount++;
            whereClause += ` AND a.status = $${paramCount}`;
            params.push(status);
        }

        if (category && category !== 'all') {
            paramCount++;
            whereClause += ` AND a.category = $${paramCount}`;
            params.push(category);
        }

        if (chapter && chapter !== 'all') {
            paramCount++;
            whereClause += ` AND a.chapter = $${paramCount}`;
            params.push(chapter);
        }

        if (author_id) {
            paramCount++;
            whereClause += ` AND a.author_id = $${paramCount}`;
            params.push(author_id);
        }

        const result = await query(`
            SELECT a.*, u.name as author_name, u.username as author_username,
                   (SELECT COUNT(*) FROM comments c WHERE c.article_id = a.id) as comment_count
            FROM articles a
            LEFT JOIN users u ON a.author_id = u.id
            ${whereClause}
            ORDER BY a.created_at DESC
        `, params);

        res.json({ articles: result.rows });

    } catch (error) {
        console.error('Error obteniendo artículos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener artículo por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(`
            SELECT a.*, u.name as author_name, u.username as author_username
            FROM articles a
            LEFT JOIN users u ON a.author_id = u.id
            WHERE a.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        res.json({ article: result.rows[0] });

    } catch (error) {
        console.error('Error obteniendo artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear nuevo artículo
router.post('/', async (req, res) => {
    try {
        const { title, category, chapter, content, author_id, image_url, status } = req.body;

        if (!title || !category || !chapter || !content || !author_id) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const result = await query(
            `INSERT INTO articles (title, category, chapter, content, author_id, image_url, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [title, category, chapter, content, author_id, image_url || null, status || 'draft']
        );

        // Si el artículo se envía para revisión, crear notificación para docentes
        if (status === 'pending') {
            const teachers = await query('SELECT id FROM users WHERE role = $1', ['teacher']);
            
            for (const teacher of teachers.rows) {
                await query(
                    'INSERT INTO notifications (user_id, title, content, type, link) VALUES ($1, $2, $3, $4, $5)',
                    [teacher.id, '📝 Nuevo artículo pendiente', `"${title}" está esperando revisión`, 'warning', '/pending-articles']
                );
            }
        }

        res.status(201).json({ 
            message: 'Artículo creado exitosamente',
            article: result.rows[0]
        });

    } catch (error) {
        console.error('Error creando artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar artículo
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, chapter, content, image_url, status } = req.body;

        const result = await query(
            `UPDATE articles 
             SET title = $1, category = $2, chapter = $3, content = $4, 
                 image_url = $5, status = $6, updated_at = CURRENT_TIMESTAMP
             WHERE id = $7 
             RETURNING *`,
            [title, category, chapter, content, image_url, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        res.json({ 
            message: 'Artículo actualizado exitosamente',
            article: result.rows[0]
        });

    } catch (error) {
        console.error('Error actualizando artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Aprobar artículo (para docentes/admins)
router.patch('/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            `UPDATE articles 
             SET status = 'published', published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
             WHERE id = $1 
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        const article = result.rows[0];

        // Crear notificación para el autor
        await query(
            'INSERT INTO notifications (user_id, title, content, type) VALUES ($1, $2, $3, $4)',
            [article.author_id, '🎉 Artículo aprobado', `Tu artículo "${article.title}" ha sido publicado`, 'success']
        );

        res.json({ 
            message: 'Artículo aprobado y publicado exitosamente',
            article
        });

    } catch (error) {
        console.error('Error aprobando artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Rechazar artículo (para docentes/admins)
router.patch('/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;
        const { rejection_reason } = req.body;

        if (!rejection_reason) {
            return res.status(400).json({ error: 'Motivo de rechazo requerido' });
        }

        const result = await query(
            `UPDATE articles 
             SET status = 'rejected', rejection_reason = $1, updated_at = CURRENT_TIMESTAMP
             WHERE id = $2 
             RETURNING *`,
            [rejection_reason, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        const article = result.rows[0];

        // Crear notificación para el autor
        await query(
            'INSERT INTO notifications (user_id, title, content, type) VALUES ($1, $2, $3, $4)',
            [article.author_id, '📝 Artículo requiere cambios', `Tu artículo "${article.title}" fue rechazado. Motivo: ${rejection_reason}`, 'danger']
        );

        res.json({ 
            message: 'Artículo rechazado exitosamente',
            article
        });

    } catch (error) {
        console.error('Error rechazando artículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener artículos pendientes de revisión
router.get('/pending/review', async (req, res) => {
    try {
        const result = await query(`
            SELECT a.*, u.name as author_name, u.username as author_username
            FROM articles a
            LEFT JOIN users u ON a.author_id = u.id
            WHERE a.status = 'pending'
            ORDER BY a.created_at ASC
        `);

        res.json({ articles: result.rows });

    } catch (error) {
        console.error('Error obteniendo artículos pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;