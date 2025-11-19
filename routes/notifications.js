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

// Obtener notificaciones del usuario
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { limit = 20, page = 1 } = req.query;

        const result = await database.query(`
            SELECT * FROM revista_digital.notifications 
            WHERE user_id = $1 
            ORDER BY created_at DESC 
            LIMIT $2 OFFSET $3
        `, [req.user.id, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)]);

        const totalResult = await database.query(
            'SELECT COUNT(*) FROM revista_digital.notifications WHERE user_id = $1',
            [req.user.id]
        );

        res.json({
            success: true,
            notifications: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(totalResult.rows[0].count),
                totalPages: Math.ceil(parseInt(totalResult.rows[0].count) / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('❌ Error obteniendo notificaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Marcar notificación como leída
router.patch('/:id/read', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await database.query(`
            UPDATE revista_digital.notifications 
            SET read = true 
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `, [id, req.user.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Notificación no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Notificación marcada como leída',
            notification: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error marcando notificación como leída:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Marcar todas las notificaciones como leídas
router.patch('/read-all', authenticateToken, async (req, res) => {
    try {
        await database.query(`
            UPDATE revista_digital.notifications 
            SET read = true 
            WHERE user_id = $1 AND read = false
        `, [req.user.id]);

        res.json({
            success: true,
            message: 'Todas las notificaciones marcadas como leídas'
        });

    } catch (error) {
        console.error('❌ Error marcando notificaciones como leídas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener estadísticas de notificaciones
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const totalResult = await database.query(
            'SELECT COUNT(*) FROM revista_digital.notifications WHERE user_id = $1',
            [req.user.id]
        );

        const unreadResult = await database.query(
            'SELECT COUNT(*) FROM revista_digital.notifications WHERE user_id = $1 AND read = false',
            [req.user.id]
        );

        const recentResult = await database.query(
            `SELECT COUNT(*) FROM revista_digital.notifications 
             WHERE user_id = $1 AND created_at >= CURRENT_DATE - INTERVAL '7 days'`,
            [req.user.id]
        );

        res.json({
            success: true,
            stats: {
                total: parseInt(totalResult.rows[0].count),
                unread: parseInt(unreadResult.rows[0].count),
                recent: parseInt(recentResult.rows[0].count)
            }
        });

    } catch (error) {
        console.error('❌ Error obteniendo estadísticas de notificaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Eliminar notificación
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await database.query(`
            DELETE FROM revista_digital.notifications 
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `, [id, req.user.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Notificación no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Notificación eliminada exitosamente'
        });

    } catch (error) {
        console.error('❌ Error eliminando notificación:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;