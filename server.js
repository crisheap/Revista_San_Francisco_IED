// server.js - Servidor completo para producción
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { query } = require('./database');
const { initializeDatabase } = require('./init-db');

const app = express();
const PORT = process.env.PORT || 10000;

// Configuración de CORS para producción
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5500',
            'https://revista-digital-csf.onrender.com',
            'https://revista-digital-csf-frontend.onrender.com'
        ];
        
        // Permitir requests sin origin (como mobile apps o Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Bloqueado por CORS:', origin);
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d', // Cache por 1 día
    etag: false
}));

// Middleware para manejar errores de archivos estáticos silenciosamente
app.use((req, res, next) => {
    // Si es una solicitud de icono, responder silenciosamente
    if (req.path.includes('/icons/')) {
        console.log(`🖼️ Solicitud de icono ignorada: ${req.path}`);
        return res.status(204).send(); // 204 No Content
    }
    next();
});
// Middleware de logging mejorado
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
    
    // Log específico para archivos estáticos
    if (req.path.includes('.js') || req.path.includes('.css') || req.path.includes('.html')) {
        const filePath = path.join(__dirname, 'public', req.path);
        console.log(`📁 Buscando archivo: ${filePath}`);
    }
    
    next();
});

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Inicializar base de datos
initializeDatabase().then(() => {
    console.log('✅ Base de datos inicializada correctamente');
}).catch(error => {
    console.error('❌ Error inicializando base de datos:', error);
});

// =======================
// RUTAS DE LA API
// =======================

// Ruta de salud de la API
app.get('/api/health', async (req, res) => {
    try {
        // Verificar conexión a la base de datos
        await query('SELECT 1');
        res.json({ 
            status: 'OK', 
            message: 'Revista Digital CSF API - Funcionando correctamente',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            database: 'Conectada'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'ERROR', 
            message: 'Problema con la base de datos',
            error: error.message 
        });
    }
});

// Autenticación
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        console.log(`🔐 Intento de login: ${username}, rol: ${role}`);
        
        const result = await query(
            'SELECT id, username, name, role, talento, active, last_login FROM users WHERE username = $1 AND password = $2 AND role = $3 AND active = true',
            [username, password, role]
        );

        console.log(`📊 Resultado de BD: ${result.rows.length} usuarios encontrados`);
        
        if (result.rows.length === 0) {
            console.log(`❌ Login fallido para: ${username}`);
            return res.status(401).json({ error: 'Credenciales incorrectas o usuario inactivo' });
        }

        const user = result.rows[0];
        console.log(`✅ Login exitoso: ${user.name} (${user.role})`);
        
        // Actualizar último login
        await query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        res.json({ user });
    } catch (error) {
        console.error('💥 Error en login:', error);
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

        res.json({ 
            success: true,
            articles: result.rows 
        });
    } catch (error) {
        console.error('Error obteniendo artículos:', error);
        res.status(500).json({ error: 'Error del servidor al obtener artículos' });
    }
});

// Crear/Actualizar artículo
app.post('/api/articles', async (req, res) => {
    try {
        const { id, title, category, chapter, content, author_id, status, image_url } = req.body;
        
        // Validaciones básicas
        if (!title || !category || !chapter || !content || !author_id) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        if (id) {
            // Actualizar artículo existente
            const result = await query(`
                UPDATE articles 
                SET title = $1, category = $2, chapter = $3, content = $4, status = $5, 
                    image_url = $6, updated_at = CURRENT_TIMESTAMP
                WHERE id = $7 AND author_id = $8
                RETURNING *
            `, [title, category, chapter, content, status, image_url, id, author_id]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Artículo no encontrado' });
            }
            
            res.json({ 
                success: true,
                article: result.rows[0] 
            });
        } else {
            // Crear nuevo artículo
            const result = await query(`
                INSERT INTO articles (title, category, chapter, content, author_id, status, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `, [title, category, chapter, content, author_id, status, image_url]);
            
            res.json({ 
                success: true,
                article: result.rows[0] 
            });
        }
    } catch (error) {
        console.error('Error guardando artículo:', error);
        res.status(500).json({ error: 'Error del servidor al guardar el artículo' });
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
            success: true,
            article: result.rows[0],
            comments: commentsResult.rows
        });
    } catch (error) {
        console.error('Error obteniendo artículo:', error);
        res.status(500).json({ error: 'Error del servidor al obtener el artículo' });
    }
});

// Agregar comentario
app.post('/api/articles/:id/comments', async (req, res) => {
    try {
        const { author_id, content } = req.body;
        
        if (!author_id || !content) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const result = await query(`
            INSERT INTO comments (article_id, author_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [req.params.id, author_id, content]);

        res.json({ 
            success: true,
            comment: result.rows[0] 
        });
    } catch (error) {
        console.error('Error agregando comentario:', error);
        res.status(500).json({ error: 'Error del servidor al agregar comentario' });
    }
});

// Obtener usuarios
app.get('/api/users', async (req, res) => {
    try {
        const result = await query(`
            SELECT id, username, name, role, talento, active, last_login, created_at
            FROM users 
            ORDER BY created_at DESC
        `);
        res.json({ 
            success: true,
            users: result.rows 
        });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error del servidor al obtener usuarios' });
    }
});

// Crear usuario
app.post('/api/users', async (req, res) => {
    try {
        const { username, password, name, role, talento } = req.body;
        
        if (!username || !password || !name || !role) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'El nombre de usuario ya existe' });
        }

        const result = await query(`
            INSERT INTO users (username, password, name, role, talento)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, name, role, talento, active, last_login
        `, [username, password, name, role, talento]);

        res.json({ 
            success: true,
            user: result.rows[0] 
        });
    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error del servidor al crear usuario' });
    }
});

// Verificar nombre de usuario
app.get('/api/users/check-username', async (req, res) => {
    try {
        const { username } = req.query;
        
        if (!username) {
            return res.status(400).json({ error: 'Username es requerido' });
        }

        const result = await query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        res.json({ 
            exists: result.rows.length > 0 
        });
    } catch (error) {
        console.error('Error verificando usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Actualizar estado de usuario
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

        res.json({ 
            success: true,
            user: result.rows[0] 
        });
    } catch (error) {
        console.error('Error actualizando estado de usuario:', error);
        res.status(500).json({ error: 'Error del servidor al actualizar estado' });
    }
});

// Resetear contraseña
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

        res.json({ 
            success: true,
            user: result.rows[0] 
        });
    } catch (error) {
        console.error('Error reseteando contraseña:', error);
        res.status(500).json({ error: 'Error del servidor al resetear contraseña' });
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

        res.json({ 
            success: true,
            notifications: result.rows 
        });
    } catch (error) {
        console.error('Error obteniendo notificaciones:', error);
        res.status(500).json({ error: 'Error del servidor al obtener notificaciones' });
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

        res.json({ 
            success: true,
            stats: result.rows[0] 
        });
    } catch (error) {
        console.error('Error actualizando estadísticas:', error);
        res.status(500).json({ error: 'Error del servidor al actualizar estadísticas' });
    }
});
// =======================
// RUTAS ESPECÍFICAS PARA ARCHIVOS PWA - SIN ICONOS
// =======================

// Ruta para el Service Worker
app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sw.js'), {
        headers: {
            'Content-Type': 'application/javascript'
        }
    });
});

// Ruta para el manifest.json
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'manifest.json'), {
        headers: {
            'Content-Type': 'application/manifest+json'
        }
    });
});

// Ruta para offline.html
app.get('/offline.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'offline.html'));
});

// Agrega esto ANTES de las otras rutas en server.js

// Ruta para favicon (evita errores 404)
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No Content - evita errores
});

// Ruta para íconos faltantes
app.get('/icons/icon-:size.png', (req, res) => {
    console.log(`🖼️ Solicitud de icono ignorada: /icons/icon-${req.params.size}.png`);
    res.status(204).end(); // No Content
});

// Ruta de health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Revista Digital CSF API - Funcionando correctamente',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// IMPORTANTE: Esta ruta debe ir AL FINAL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =======================
// RUTAS ESPECÍFICAS PARA ARCHIVOS PWA - MEJORADO
// =======================

// Ruta para icons con manejo de errores
app.get('/icons/:icon', (req, res) => {
    const iconName = req.params.icon;
    const iconPath = path.join(__dirname, 'public', 'icons', iconName);
    
    // Verificar si el archivo existe
    if (fs.existsSync(iconPath)) {
        res.sendFile(iconPath);
    } else {
        console.log(`⚠️ Icono no encontrado: ${iconName}`);
        // Enviar un icono por defecto o error 404
        res.status(404).json({ error: 'Icono no encontrado' });
    }
});

// Ruta para el Service Worker
app.get('/sw.js', (req, res) => {
    const swPath = path.join(__dirname, 'public', 'sw.js');
    if (fs.existsSync(swPath)) {
        res.sendFile(swPath, {
            headers: {
                'Content-Type': 'application/javascript',
                'Service-Worker-Allowed': '/'
            }
        });
    } else {
        console.log('⚠️ Service Worker no encontrado');
        res.status(404).send('Service Worker no disponible');
    }
});

// Ruta para el manifest.json
app.get('/manifest.json', (req, res) => {
    const manifestPath = path.join(__dirname, 'public', 'manifest.json');
    if (fs.existsSync(manifestPath)) {
        res.sendFile(manifestPath, {
            headers: {
                'Content-Type': 'application/manifest+json'
            }
        });
    } else {
        console.log('⚠️ Manifest no encontrado');
        res.status(404).json({ error: 'Manifest no disponible' });
    }
});

// Ruta para offline.html
app.get('/offline.html', (req, res) => {
    const offlinePath = path.join(__dirname, 'public', 'offline.html');
    if (fs.existsSync(offlinePath)) {
        res.sendFile(offlinePath);
    } else {
        res.status(404).send('Página offline no disponible');
    }
});

// IMPORTANTE: Esta ruta debe ir AL FINAL - Maneja todas las rutas del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Ruta para servir el manifest.json correctamente
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

// Ruta para servir el service worker
app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sw.js'));
});

// Ruta para servir offline.html
app.get('/offline.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'offline.html'));
});

// IMPORTANTE: Esta ruta debe ir AL FINAL - Maneja todas las rutas del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((error, req, res, next) => {
    console.error('Error global:', error);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(50));
    console.log('🚀 REVISTA DIGITAL CSF - SERVIDOR INICIADO');
    console.log('='.repeat(50));
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Base de datos: Neon PostgreSQL`);
    console.log(`🔗 Health Check: http://0.0.0.0:${PORT}/api/health`);
    console.log('='.repeat(50));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});