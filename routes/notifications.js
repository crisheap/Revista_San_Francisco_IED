import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Obtener notificaciones del usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { unread } = req.query;

        let whereClause = 'WHERE user_id = $1';
        const params = [userId];

        if (unread === 'true') {
            whereClause += ' AND read = false';
        }

        const result = await query(`
            SELECT * FROM notifications 
            ${whereClause}
            ORDER BY created_at DESC
            LIMIT 50
        `, params);

        res.json({ notifications: result.rows });

    } catch (error) {
        console.error('Error obteniendo notificaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Marcar notificación como leída
router.patch('/:id/read', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'UPDATE notifications SET read = true WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        res.json({ 
            message: 'Notificación marcada como leída',
            notification: result.rows[0]
        });

    } catch (error) {
        console.error('Error marcando notificación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Marcar todas como leídas
router.patch('/user/:userId/read-all', async (req, res) => {
    try {
        const { userId } = req.params;

        await query(
            'UPDATE notifications SET read = true WHERE user_id = $1 AND read = false',
            [userId]
        );

        res.json({ message: 'Todas las notificaciones marcadas como leídas' });

    } catch (error) {
        console.error('Error marcando notificaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener estadísticas de notificaciones
router.get('/user/:userId/stats', async (req, res) => {
    try {
        const { userId } = req.params;

        const totalResult = await query(
            'SELECT COUNT(*) FROM notifications WHERE user_id = $1',
            [userId]
        );

        const unreadResult = await query(
            'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND read = false',
            [userId]
        );

        res.json({
            total: parseInt(totalResult.rows[0].count),
            unread: parseInt(unreadResult.rows[0].count)
        });

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;