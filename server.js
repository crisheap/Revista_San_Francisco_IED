/*const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const database = require('./database');
const { initializeDatabase } = require('./init-db');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/games', require('./routes/games'));

// Health check
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = await database.testConnection();
        res.json({
            status: 'OK',
            database: dbStatus ? 'Connected' : 'Disconnected',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            database: 'Disconnected',
            error: error.message
        });
    }
});

// Servir la aplicación React/Vue si existe, sino el index.html estático
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((error, req, res, next) => {
    console.error('❌ Error global:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
    });
});

// Inicializar servidor
async function startServer() {
    try {
        // Inicializar base de datos
        await initializeDatabase();
        
        // Iniciar servidor
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Error iniciando el servidor:', error);
        process.exit(1);
    }
}

// Manejo graceful de shutdown
process.on('SIGINT', async () => {
    console.log('🛑 Apagando servidor...');
    await database.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('🛑 Apagando servidor...');
    await database.close();
    process.exit(0);
});

startServer();*/

/*--------------------------------------------------------------------- */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const database = require('./database');
const { initializeDatabase } = require('./init-db');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas (todas usarán Neon directamente)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/games', require('./routes/games'));

// Health check específico para Neon
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = await database.testConnection();
        res.json({
            status: 'OK',
            database: 'Neon PostgreSQL',
            connected: dbStatus,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR', 
            database: 'Neon PostgreSQL',
            connected: false,
            error: error.message
        });
    }
});

// Ruta para servir la aplicación
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializar servidor
async function startServer() {
    try {
        await initializeDatabase();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
            console.log(`🗄️  Base de datos: Neon PostgreSQL`);
            console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
}

startServer();