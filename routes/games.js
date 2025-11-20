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

// Obtener estadísticas de juegos del usuario
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const result = await database.query(`
            SELECT * FROM revista_digital.game_stats 
            WHERE user_id = $1
        `, [req.user.id]);

        // Si no hay estadísticas, crear registros vacíos
        if (result.rows.length === 0) {
            const games = ['sudoku', 'memory', 'crossword'];
            
            for (const gameType of games) {
                await database.query(`
                    INSERT INTO revista_digital.game_stats (user_id, game_type)
                    VALUES ($1, $2)
                    ON CONFLICT (user_id, game_type) DO NOTHING
                `, [req.user.id, gameType]);
            }

            // Obtener las estadísticas recién creadas
            const newResult = await database.query(`
                SELECT * FROM revista_digital.game_stats 
                WHERE user_id = $1
            `, [req.user.id]);

            return res.json({
                success: true,
                stats: newResult.rows
            });
        }

        res.json({
            success: true,
            stats: result.rows
        });

    } catch (error) {
        console.error('❌ Error obteniendo estadísticas de juegos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar estadísticas de juego
router.post('/:gameType/stats', authenticateToken, async (req, res) => {
    try {
        const { gameType } = req.params;
        const { played, completed, score, time } = req.body;

        // Validar gameType
        const validGameTypes = ['sudoku', 'memory', 'crossword'];
        if (!validGameTypes.includes(gameType)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de juego inválido'
            });
        }

        // Obtener estadísticas actuales
        const currentStats = await database.query(`
            SELECT * FROM revista_digital.game_stats 
            WHERE user_id = $1 AND game_type = $2
        `, [req.user.id, gameType]);

        let result;

        if (currentStats.rows.length === 0) {
            // Crear nuevo registro
            result = await database.query(`
                INSERT INTO revista_digital.game_stats 
                (user_id, game_type, played, completed, best_score, best_time)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `, [req.user.id, gameType, played || 1, completed || 0, score || 0, time || null]);
        } else {
            const current = currentStats.rows[0];
            
            // Actualizar estadísticas
            const newPlayed = (current.played || 0) + (played || 1);
            const newCompleted = (current.completed || 0) + (completed || 0);
            const newBestScore = Math.max(current.best_score || 0, score || 0);
            const newBestTime = time && (!current.best_time || time < current.best_time) ? time : current.best_time;

            result = await database.query(`
                UPDATE revista_digital.game_stats 
                SET played = $1, completed = $2, best_score = $3, best_time = $4, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = $5 AND game_type = $6
                RETURNING *
            `, [newPlayed, newCompleted, newBestScore, newBestTime, req.user.id, gameType]);
        }

        // Crear notificación si se completó un juego o se superó un récord
        if (completed) {
            let notificationTitle = '🎮 Juego completado';
            let notificationContent = `Has completado ${gameType}`;

            if (score && score > (currentStats.rows[0]?.best_score || 0)) {
                notificationTitle = '🏆 ¡Nuevo récord!';
                notificationContent = `Nuevo récord en ${gameType}: ${score} puntos`;
            }

            await database.query(`
                INSERT INTO revista_digital.notifications 
                (user_id, title, content, type) 
                VALUES ($1, $2, $3, $4)
            `, [req.user.id, notificationTitle, notificationContent, 'success']);
        }

        res.json({
            success: true,
            message: 'Estadísticas actualizadas exitosamente',
            stats: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error actualizando estadísticas de juego:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener ranking de juegos
router.get('/leaderboard/:gameType', async (req, res) => {
    try {
        const { gameType } = req.params;
        const { limit = 10 } = req.query;

        const validGameTypes = ['sudoku', 'memory', 'crossword'];
        if (!validGameTypes.includes(gameType)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de juego inválido'
            });
        }

        const result = await database.query(`
            SELECT 
                gs.*,
                u.name as user_name,
                u.role as user_role
            FROM revista_digital.game_stats gs
            JOIN revista_digital.users u ON gs.user_id = u.id
            WHERE gs.game_type = $1 AND gs.best_score > 0 AND u.active = true
            ORDER BY gs.best_score DESC, gs.best_time ASC
            LIMIT $2
        `, [gameType, parseInt(limit)]);

        res.json({
            success: true,
            leaderboard: result.rows,
            gameType: gameType
        });

    } catch (error) {
        console.error('❌ Error obteniendo leaderboard:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener progreso general de juegos
router.get('/progress', authenticateToken, async (req, res) => {
    try {
        const result = await database.query(`
            SELECT 
                game_type,
                played,
                completed,
                best_score,
                best_time,
                ROUND((completed::decimal / played) * 100, 2) as completion_rate
            FROM revista_digital.game_stats 
            WHERE user_id = $1
        `, [req.user.id]);

        const totalPlayed = result.rows.reduce((sum, game) => sum + (game.played || 0), 0);
        const totalCompleted = result.rows.reduce((sum, game) => sum + (game.completed || 0), 0);
        const overallCompletion = totalPlayed > 0 ? Math.round((totalCompleted / totalPlayed) * 100) : 0;

        res.json({
            success: true,
            progress: {
                games: result.rows,
                overall: {
                    totalPlayed,
                    totalCompleted,
                    completionRate: overallCompletion
                }
            }
        });

    } catch (error) {
        console.error('❌ Error obteniendo progreso de juegos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;

/*------------------------------------------------------------------------------------ */

