import { query, testConnection } from '../config/database.js';

async function initializeDatabase() {
    try {
        console.log('🔄 Inicializando base de datos Neon...');
        
        // Probar conexión
        const connected = await testConnection();
        if (!connected) {
            throw new Error('No se pudo conectar a Neon PostgreSQL');
        }

        // Crear extensión para UUID si no existe
        await query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        // Tabla de usuarios
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'parent')),
                talento VARCHAR(20) CHECK (talento IN ('deportivo', 'musical', 'matematico', 'linguistico', 'tecnologico', 'artistico')),
                active BOOLEAN DEFAULT true,
                last_login TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de artículos - CORREGIDA
        await query(`
            CREATE TABLE IF NOT EXISTS articles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(20) NOT NULL CHECK (category IN ('deportivo', 'musical', 'matematico', 'linguistico', 'tecnologico', 'artistico')),
                chapter VARCHAR(20) NOT NULL CHECK (chapter IN ('portafolios', 'experiencias', 'posicionamiento')),
                content TEXT NOT NULL,
                author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                image_url VARCHAR(500),
                status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected')),
                rejection_reason TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                published_at TIMESTAMPTZ,
                
                -- CORRECCIÓN: Solo permitir published_at si el estado es 'published'
                CONSTRAINT valid_publication_date 
                    CHECK (
                        (status = 'published' AND published_at IS NOT NULL) OR 
                        (status != 'published' AND published_at IS NULL)
                    )
            )
        `);

        // Tabla de comentarios
        await query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
                author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                content TEXT NOT NULL CHECK (length(trim(content)) > 0),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de notificaciones
        await query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL CHECK (length(trim(content)) > 0),
                type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'danger')),
                read BOOLEAN DEFAULT false,
                link VARCHAR(255),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de estadísticas de juegos
        await query(`
            CREATE TABLE IF NOT EXISTS game_stats (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                game_type VARCHAR(50) NOT NULL CHECK (game_type IN ('sudoku', 'memory', 'crossword')),
                played INTEGER DEFAULT 0 CHECK (played >= 0),
                completed INTEGER DEFAULT 0 CHECK (completed >= 0 AND completed <= played),
                best_score INTEGER DEFAULT 0 CHECK (best_score >= 0),
                best_time INTEGER,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                
                UNIQUE(user_id, game_type)
            )
        `);

        // Crear índices para mejor rendimiento
        await query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
        await query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
        await query('CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id)');
        await query('CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status)');
        await query('CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at) WHERE status = \'published\'');
        await query('CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id)');
        await query('CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id)');
        await query('CREATE INDEX IF NOT EXISTS idx_game_stats_user ON game_stats(user_id)');

        console.log('✅ Tablas creadas/existen en Neon PostgreSQL');

        // Insertar datos iniciales
        await insertSampleData();

        console.log('🎉 Base de datos inicializada correctamente en Neon');

    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        throw error;
    }
}

async function insertSampleData() {
    try {
        console.log('📝 Insertando datos de ejemplo...');
        
        // Insertar usuarios de ejemplo (con contraseñas hasheadas)
        await query(`
            INSERT INTO users (username, password, name, role, talento) VALUES
            ('admin', '$2a$10$rOzZJ7S2f.8YfZ8bY8b8b.8YfZ8bY8b8b.8YfZ8bY8b8b8b8b8b8b', 'Administrador Principal', 'admin', NULL),
            ('docente1', '$2a$10$rOzZJ7S2f.8YfZ8bY8b8b.8YfZ8bY8b8b.8YfZ8bY8b8b8b8b8b8b', 'María González', 'teacher', NULL),
            ('estudiante1', '$2a$10$rOzZJ7S2f.8YfZ8bY8b8b.8YfZ8bY8b8b.8YfZ8bY8b8b8b8b8b8b', 'Juan Pérez', 'student', 'artistico'),
            ('estudiante2', '$2a$10$rOzZJ7S2f.8YfZ8bY8b8b.8YfZ8bY8b8b.8YfZ8bY8b8b8b8b8b8b', 'Ana López', 'student', 'musical'),
            ('padre1', '$2a$10$rOzZJ7S2f.8YfZ8bY8b8b.8YfZ8bY8b8b.8YfZ8bY8b8b8b8b8b8b', 'Carlos Rodríguez', 'parent', NULL)
            ON CONFLICT (username) DO NOTHING
        `);

        // Insertar artículos de ejemplo - CORREGIDO
        await query(`
            INSERT INTO articles (title, category, chapter, content, author_id, status, published_at) VALUES
            ('Nuestro equipo de fútbol gana el torneo regional', 'deportivo', 'portafolios', 'El equipo de fútbol del Colegio San Francisco IED ha logrado una victoria histórica en el torneo regional, demostrando disciplina y trabajo en equipo.', 3, 'published', NOW() - INTERVAL '5 days'),
            ('Concierto de primavera del coro estudiantil', 'musical', 'portafolios', 'El coro estudiantil presentó un emotivo concierto de primavera con canciones tradicionales colombianas y piezas contemporáneas.', 4, 'published', NOW() - INTERVAL '3 days'),
            ('Taller de robótica educativa', 'tecnologico', 'experiencias', 'El programa Talentos implementó un taller de robótica educativa donde los estudiantes aprendieron programación básica y construcción de robots.', 2, 'published', NOW() - INTERVAL '2 days'),
            ('Nueva obra de teatro estudiantil', 'artistico', 'portafolios', 'El grupo de teatro del colegio está preparando una nueva obra que será presentada en el festival intercolegial.', 3, 'pending', NULL)
            ON CONFLICT DO NOTHING
        `);

        console.log('✅ Datos de ejemplo insertados correctamente');
    } catch (error) {
        console.error('❌ Error insertando datos de ejemplo:', error);
    }
}

// Ejecutar inicialización
initializeDatabase().catch(console.error);
