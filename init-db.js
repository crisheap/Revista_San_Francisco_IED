const database = require('./database');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
    try {
        console.log('🔄 Inicializando base de datos...');
        
        // Probar conexión primero
        const connectionOk = await database.testConnection();
        if (!connectionOk) {
            throw new Error('No se pudo conectar a la base de datos');
        }

        // Crear esquema si no existe
        await database.query(`
            CREATE SCHEMA IF NOT EXISTS revista_digital;
        `);

        console.log('📊 Creando tablas...');

        // Tabla de usuarios
        await database.query(`
            CREATE TABLE IF NOT EXISTS revista_digital.users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'parent')),
                talento VARCHAR(20) CHECK (talento IN ('deportivo', 'musical', 'matematico', 'linguistico', 'tecnologico', 'artistico')),
                active BOOLEAN DEFAULT true,
                last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de artículos
        await database.query(`
            CREATE TABLE IF NOT EXISTS revista_digital.articles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(20) NOT NULL CHECK (category IN ('deportivo', 'musical', 'matematico', 'linguistico', 'tecnologico', 'artistico')),
                chapter VARCHAR(20) NOT NULL CHECK (chapter IN ('portafolios', 'experiencias', 'posicionamiento')),
                content TEXT NOT NULL,
                author_id INTEGER NOT NULL REFERENCES revista_digital.users(id) ON DELETE CASCADE,
                image_url VARCHAR(500),
                status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected')),
                rejection_reason TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                published_at TIMESTAMP,
                
                CONSTRAINT valid_publication_date 
                    CHECK (published_at IS NULL OR status = 'published')
            )
        `);

        // Tabla de comentarios
        await database.query(`
            CREATE TABLE IF NOT EXISTS revista_digital.comments (
                id SERIAL PRIMARY KEY,
                article_id INTEGER NOT NULL REFERENCES revista_digital.articles(id) ON DELETE CASCADE,
                author_id INTEGER NOT NULL REFERENCES revista_digital.users(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                CONSTRAINT non_empty_content CHECK (length(trim(content)) > 0)
            )
        `);

        // Tabla de notificaciones
        await database.query(`
            CREATE TABLE IF NOT EXISTS revista_digital.notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES revista_digital.users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'danger')),
                read BOOLEAN DEFAULT false,
                link VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                CONSTRAINT non_empty_notification_content CHECK (length(trim(content)) > 0)
            )
        `);

        // Tabla de estadísticas de juegos
        await database.query(`
            CREATE TABLE IF NOT EXISTS revista_digital.game_stats (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES revista_digital.users(id) ON DELETE CASCADE,
                game_type VARCHAR(50) NOT NULL CHECK (game_type IN ('sudoku', 'memory', 'crossword')),
                played INTEGER DEFAULT 0,
                completed INTEGER DEFAULT 0,
                best_score INTEGER DEFAULT 0,
                best_time INTEGER,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                UNIQUE(user_id, game_type),
                
                CONSTRAINT valid_played_count CHECK (played >= 0),
                CONSTRAINT valid_completed_count CHECK (completed >= 0 AND completed <= played),
                CONSTRAINT valid_best_score CHECK (best_score >= 0)
            )
        `);

        // Crear índices para mejor rendimiento
        await database.query('CREATE INDEX IF NOT EXISTS idx_users_username ON revista_digital.users(username)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_users_role ON revista_digital.users(role)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_articles_author ON revista_digital.articles(author_id)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_articles_status ON revista_digital.articles(status)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_articles_published ON revista_digital.articles(published_at) WHERE status = \'published\'');
        await database.query('CREATE INDEX IF NOT EXISTS idx_comments_article ON revista_digital.comments(article_id)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_notifications_user ON revista_digital.notifications(user_id)');
        await database.query('CREATE INDEX IF NOT EXISTS idx_game_stats_user ON revista_digital.game_stats(user_id)');

        // Insertar datos de ejemplo
        await insertSampleData();

        console.log('✅ Base de datos inicializada correctamente');

    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        throw error;
    }
}

async function insertSampleData() {
    try {
        console.log('📝 Insertando datos de ejemplo...');
        
        // Verificar si ya existen usuarios
        const userCount = await database.query('SELECT COUNT(*) FROM revista_digital.users');
        if (parseInt(userCount.rows[0].count) > 0) {
            console.log('✅ Ya existen usuarios en la base de datos');
            return;
        }

        // Hash de contraseñas
        const hashedAdminPassword = await bcrypt.hash('admin', 10);
        const hashedDefaultPassword = await bcrypt.hash('123', 10);

        // Insertar usuarios de ejemplo
        await database.query(`
            INSERT INTO revista_digital.users (username, password, name, role, talento) VALUES
            ($1, $2, $3, $4, $5),
            ($6, $7, $8, $9, $10),
            ($11, $12, $13, $14, $15),
            ($16, $17, $18, $19, $20),
            ($21, $22, $23, $24, $25)
            ON CONFLICT (username) DO NOTHING
        `, [
            'admin', hashedAdminPassword, 'Administrador Principal', 'admin', null,
            'docente1', hashedDefaultPassword, 'María González', 'teacher', null,
            'estudiante1', hashedDefaultPassword, 'Juan Pérez', 'student', 'artistico',
            'estudiante2', hashedDefaultPassword, 'Ana López', 'student', 'musical',
            'padre1', hashedDefaultPassword, 'Carlos Rodríguez', 'parent', null
        ]);

        // Insertar artículos de ejemplo
        await database.query(`
            INSERT INTO revista_digital.articles (title, category, chapter, content, author_id, status, published_at) VALUES
            ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '5 days'),
            ($7, $8, $9, $10, $11, $12, NOW() - INTERVAL '3 days'),
            ($13, $14, $15, $16, $17, $18, NOW() - INTERVAL '2 days')
            ON CONFLICT DO NOTHING
        `, [
            'Nuestro equipo de fútbol gana el torneo regional', 'deportivo', 'portafolios', 'El equipo de fútbol del Colegio San Francisco IED ha logrado una victoria histórica en el torneo regional...', 3, 'published',
            'Concierto de primavera del coro estudiantil', 'musical', 'portafolios', 'El coro estudiantil presentó un emotivo concierto de primavera con canciones tradicionales...', 4, 'published',
            'Taller de robótica educativa', 'tecnologico', 'experiencias', 'El programa Talentos implementó un taller de robótica educativa donde los estudiantes aprendieron programación...', 2, 'published'
        ]);

        console.log('✅ Datos de ejemplo insertados correctamente');
    } catch (error) {
        console.error('❌ Error insertando datos de ejemplo:', error);
    }
}

module.exports = { initializeDatabase, insertSampleData };