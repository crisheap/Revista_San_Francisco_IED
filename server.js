// Cargar variables de entorno
require('dotenv').config();
// server.js - Servidor backend para la Revista Digital
const express = require('express');
const cors = require('cors');
const path = require('path');
const { query } = require('./database');
const { initializeDatabase } = require('./init-db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});
// Inicializar base de datos al iniciar el servidor
initializeDatabase().catch(console.error);

// =======================
// RUTAS DE LA API
// =======================

// Autenticación
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        const result = await query(
            'SELECT id, username, name, role, talento, active, last_login FROM users WHERE username = $1 AND password = $2 AND role = $3 AND active = true',
            [username, password, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Actualizar último login
        await query(
            'UPDATE users SET last_login = CURRENT_DATE WHERE id = $1',
            [result.rows[0].id]
        );

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Obtener artículos
app.get('/api/articles', async (req, res) => {
    try {
        const { status, category, chapter, user_id } = req.query;
        
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

        if (user_id) {
            paramCount++;
            whereClause += ` AND a.author_id = $${paramCount}`;
            params.push(user_id);
        }

        const result = await query(`
            SELECT a.*, u.name as author_name, 
                   COUNT(c.id) as comments_count
            FROM articles a 
            LEFT JOIN users u ON a.author_id = u.id 
            LEFT JOIN comments c ON a.id = c.article_id
            ${whereClause}
            GROUP BY a.id, u.name
            ORDER BY a.created_at DESC
        `, params);

        res.json({ articles: result.rows });
    } catch (error) {
        console.error('Error obteniendo artículos:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Crear/Actualizar artículo
app.post('/api/articles', async (req, res) => {
    try {
        const { id, title, category, chapter, content, author_id, status, image_url } = req.body;
        
        if (id) {
            // Actualizar artículo existente
            const result = await query(`
                UPDATE articles 
                SET title = $1, category = $2, chapter = $3, content = $4, status = $5, 
                    image_url = $6, updated_at = CURRENT_TIMESTAMP
                WHERE id = $7 AND author_id = $8
                RETURNING *
            `, [title, category, chapter, content, status, image_url, id, author_id]);
            
            res.json({ article: result.rows[0] });
        } else {
            // Crear nuevo artículo
            const result = await query(`
                INSERT INTO articles (title, category, chapter, content, author_id, status, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `, [title, category, chapter, content, author_id, status, image_url]);
            
            res.json({ article: result.rows[0] });
        }
    } catch (error) {
        console.error('Error guardando artículo:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Obtener artículo específico
app.get('/api/articles/:id', async (req, res) => {
    try {
        const result = await query(`
            SELECT a.*, u.name as author_name
            FROM articles a 
            LEFT JOIN users u ON a.author_id = u.id 
            WHERE a.id = $1
        `, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        // Obtener comentarios del artículo
        const commentsResult = await query(`
            SELECT c.*, u.name as author_name 
            FROM comments c 
            LEFT JOIN users u ON c.author_id = u.id 
            WHERE c.article_id = $1 
            ORDER BY c.created_at ASC
        `, [req.params.id]);

        res.json({ 
            article: result.rows[0],
            comments: commentsResult.rows
        });
    } catch (error) {
        console.error('Error obteniendo artículo:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Agregar comentario
app.post('/api/articles/:id/comments', async (req, res) => {
    try {
        const { author_id, content } = req.body;
        
        const result = await query(`
            INSERT INTO comments (article_id, author_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [req.params.id, author_id, content]);

        res.json({ comment: result.rows[0] });
    } catch (error) {
        console.error('Error agregando comentario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Gestión de usuarios (solo admin)
app.get('/api/users', async (req, res) => {
    try {
        const result = await query(`
            SELECT id, username, name, role, talento, active, last_login, created_at
            FROM users 
            ORDER BY created_at DESC
        `);
        res.json({ users: result.rows });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Crear usuario
app.post('/api/users', async (req, res) => {
    try {
        const { username, password, name, role, talento } = req.body;
        
        const result = await query(`
            INSERT INTO users (username, password, name, role, talento)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, name, role, talento, active, last_login
        `, [username, password, name, role, talento]);

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Obtener notificaciones
app.get('/api/notifications/:user_id', async (req, res) => {
    try {
        const result = await query(`
            SELECT * FROM notifications 
            WHERE user_id = $1 
            ORDER BY created_at DESC 
            LIMIT 10
        `, [req.params.user_id]);

        res.json({ notifications: result.rows });
    } catch (error) {
        console.error('Error obteniendo notificaciones:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Gestión de estadísticas de juegos
app.post('/api/game-stats', async (req, res) => {
    try {
        const { user_id, game_type, completed, score, time } = req.body;
        
        const result = await query(`
            INSERT INTO game_stats (user_id, game_type, played, completed, best_score, best_time)
            VALUES ($1, $2, 1, $3, $4, $5)
            ON CONFLICT (user_id, game_type) 
            DO UPDATE SET 
                played = game_stats.played + 1,
                completed = CASE WHEN $3 THEN game_stats.completed + 1 ELSE game_stats.completed END,
                best_score = GREATEST(game_stats.best_score, $4),
                best_time = CASE 
                    WHEN $5 IS NOT NULL AND (game_stats.best_time IS NULL OR $5 < game_stats.best_time) 
                    THEN $5 ELSE game_stats.best_time 
                END,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `, [user_id, game_type, completed, score, time]);

        res.json({ stats: result.rows[0] });
    } catch (error) {
        console.error('Error actualizando estadísticas:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Servir la aplicación principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: Neon PostgreSQL`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
});

// Ruta para actualizar estado de usuario
app.put('/api/users/:id/status', async (req, res) => {
    try {
        const { active } = req.body;
        
        const result = await query(
            'UPDATE users SET active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, name, active',
            [active, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error actualizando estado de usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Ruta para resetear contraseña
app.put('/api/users/:id/password', async (req, res) => {
    try {
        const { password } = req.body;
        
        const result = await query(
            'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, name',
            [password, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error reseteando contraseña:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
