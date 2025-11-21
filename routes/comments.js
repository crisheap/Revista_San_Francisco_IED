import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Obtener comentarios de un artículo
router.get('/article/:articleId', async (req, res) => {
    try {
        const { articleId } = req.params;

        const result = await query(`
            SELECT c.*, u.name as author_name, u.username as author_username
            FROM comments c
            LEFT JOIN users u ON c.author_id = u.id
            WHERE c.article_id = $1
            ORDER BY c.created_at ASC
        `, [articleId]);

        res.json({ comments: result.rows });

    } catch (error) {
        console.error('Error obteniendo comentarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear nuevo comentario
router.post('/', async (req, res) => {
    try {
        const { article_id, author_id, content } = req.body;

        if (!article_id || !author_id || !content) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar que el artículo existe y está publicado
        const articleResult = await query(
            'SELECT id, author_id, title FROM articles WHERE id = $1 AND status = $2',
            [article_id, 'published']
        );

        if (articleResult.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado o no publicado' });
        }

        const article = articleResult.rows[0];

        // Insertar comentario
        const result = await query(
            `INSERT INTO comments (article_id, author_id, content) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [article_id, author_id, content]
        );

        // Crear notificación para el autor del artículo (si no es el mismo)
        if (article.author_id !== author_id) {
            await query(
                'INSERT INTO notifications (user_id, title, content, type, link) VALUES ($1, $2, $3, $4, $5)',
                [article.author_id, '💬 Nuevo comentario', `Tu artículo "${article.title}" tiene un nuevo comentario`, 'info', `/article/${article_id}`]
            );
        }

        res.status(201).json({ 
            message: 'Comentario publicado exitosamente',
            comment: result.rows[0]
        });

    } catch (error) {
        console.error('Error creando comentario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;