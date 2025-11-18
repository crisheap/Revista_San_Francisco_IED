// init-db.js - Crear tablas y datos iniciales
const { query } = require('./database');

async function initializeDatabase() {
    try {
        console.log('🔄 Inicializando base de datos...');

        // Tabla de usuarios
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'parent')),
                talento VARCHAR(20),
                active BOOLEAN DEFAULT true,
                last_login DATE DEFAULT CURRENT_DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de artículos
        await query(`
            CREATE TABLE IF NOT EXISTS articles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(20) NOT NULL CHECK (category IN ('deportivo', 'musical', 'matematico', 'linguistico', 'tecnologico', 'artistico')),
                chapter VARCHAR(20) NOT NULL CHECK (chapter IN ('portafolios', 'experiencias', 'posicionamiento')),
                content TEXT NOT NULL,
                author_id INTEGER REFERENCES users(id),
                image_url VARCHAR(500),
                status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected')),
                rejection_reason TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                published_at TIMESTAMP
            )
        `);

        // Tabla de comentarios
        await query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
                author_id INTEGER REFERENCES users(id),
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de notificaciones
        await query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'danger')),
                read BOOLEAN DEFAULT false,
                link VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de estadísticas de juegos
        await query(`
            CREATE TABLE IF NOT EXISTS game_stats (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                game_type VARCHAR(50) NOT NULL,
                played INTEGER DEFAULT 0,
                completed INTEGER DEFAULT 0,
                best_score INTEGER DEFAULT 0,
                best_time INTEGER,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, game_type)
            )
        `);

        // Insertar usuarios de ejemplo si no existen
        const userCount = await query('SELECT COUNT(*) FROM users');
        if (parseInt(userCount.rows[0].count) === 0) {
            await query(`
                INSERT INTO users (username, password, name, role, talento) VALUES
                ('estudiante1', '123', 'Juan Pérez', 'student', 'artistico'),
                ('docente1', '123', 'María González', 'teacher', NULL),
                ('admin', 'admin', 'Administrador Sistema', 'admin', NULL),
                ('padre1', '123', 'Carlos Rodríguez', 'parent', NULL),
                ('estudiante2', '123', 'Ana López', 'student', 'musical')
            `);
        }

        console.log('✅ Base de datos inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        throw error;
    }
}

module.exports = { initializeDatabase };