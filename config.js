// config.js - Configuración de la aplicación desde variables de entorno
require('dotenv').config();

const config = {
    // Base de datos
    database: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        pool: {
            max: parseInt(process.env.DB_POOL_MAX) || 20,
            idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
            connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 2000,
        }
    },
    
    // Servidor
    server: {
        port: parseInt(process.env.PORT) || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
        appUrl: process.env.APP_URL || 'http://localhost:3000',
        clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
    },
    
    // Seguridad
    security: {
        jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key',
        sessionSecret: process.env.SESSION_SECRET || 'fallback_session_secret',
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },
    
    // Aplicación
    app: {
        name: process.env.APP_NAME || 'Revista Digital',
        version: process.env.APP_VERSION || '1.0.0',
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
        uploadPath: process.env.UPLOAD_PATH || './uploads',
        cacheDuration: parseInt(process.env.CACHE_DURATION) || 3600
    },
    
    // Email (opcional)
    email: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        adminEmail: process.env.ADMIN_EMAIL,
        supportEmail: process.env.SUPPORT_EMAIL
    },
    
    // PWA
    pwa: {
        swVersion: process.env.SW_VERSION || '2.1',
        cacheName: process.env.CACHE_NAME || 'revista-digital-v2.1'
    },
    
    // Juegos
    games: {
        maxAttempts: parseInt(process.env.MAX_GAME_ATTEMPTS) || 100,
        sessionTimeout: parseInt(process.env.GAME_SESSION_TIMEOUT) || 3600
    },
    
    // Notificaciones
    notifications: {
        expiryDays: parseInt(process.env.NOTIFICATION_EXPIRY_DAYS) || 30,
        pushEnabled: process.env.PUSH_NOTIFICATION_ENABLED === 'true'
    }
};

// Validar configuraciones críticas
if (!config.database.connectionString) {
    console.warn('⚠️  DATABASE_URL no está definida en las variables de entorno');
}

if (config.security.jwtSecret === 'fallback_secret_key') {
    console.warn('⚠️  JWT_SECRET no está definida, usando valor por defecto');
}

module.exports = config;