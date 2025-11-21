import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Obtener estadísticas de juegos del usuario
router.get('/user/:userId/stats', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await query(`
            SELECT game_type, played, completed, best_score, best_time, updated_at
            FROM game_stats 
            WHERE user_id = $1
            ORDER BY game_type
        `, [userId]);

        res.json({ stats: result.rows });

    } catch (error) {
        console.error('Error obteniendo estadísticas de juegos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar estadísticas de juego
router.post('/stats', async (req, res) => {
    try {
        const { user_id, game_type, played, completed, best_score, best_time } = req.body;

        if (!user_id || !game_type) {
            return res.status(400).json({ error: 'Usuario y tipo de juego requeridos' });
        }

        const result = await query(`
            INSERT INTO game_stats (user_id, game_type, played, completed, best_score, best_time)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (user_id, game_type) 
            DO UPDATE SET 
                played = EXCLUDED.played,
                completed = EXCLUDED.completed,
                best_score = GREATEST(game_stats.best_score, EXCLUDED.best_score),
                best_time = LEAST(game_stats.best_time, EXCLUDED.best_time),
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `, [user_id, game_type, played || 0, completed || 0, best_score || 0, best_time || null]);

        res.json({ 
            message: 'Estadísticas actualizadas exitosamente',
            stats: result.rows[0]
        });

    } catch (error) {
        console.error('Error actualizando estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener ranking de juegos
router.get('/leaderboard/:gameType', async (req, res) => {
    try {
        const { gameType } = req.params;

        const result = await query(`
            SELECT u.name, u.username, gs.best_score, gs.best_time, gs.completed
            FROM game_stats gs
            LEFT JOIN users u ON gs.user_id = u.id
            WHERE gs.game_type = $1 AND u.active = true
            ORDER BY gs.best_score DESC, gs.best_time ASC
            LIMIT 10
        `, [gameType]);

        res.json({ leaderboard: result.rows });

    } catch (error) {
        console.error('Error obteniendo leaderboard:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;

