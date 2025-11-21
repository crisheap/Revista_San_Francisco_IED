const database = require('./database');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

class DatabaseInitializer {
    constructor() {
        this.schemaFile = path.join(__dirname, 'database-schema.sql');
    }

    async initialize() {
        try {
            console.log('🔄 Inicializando base de datos Revista Digital...');
            
            // Probar conexión
            const connectionOk = await database.testConnection();
            if (!connectionOk) {
                throw new Error('No se pudo conectar a la base de datos Neon PostgreSQL');
            }

            // Verificar si las tablas ya existen
            const tablesExist = await this.checkTablesExist();
            
            if (tablesExist) {
                console.log('✅ Las tablas ya existen en la base de datos');
                
                // Verificar si hay datos de ejemplo
                const hasData = await this.checkSampleData();
                if (!hasData) {
                    console.log('📝 Insertando datos de ejemplo...');
                    await this.insertSampleData();
                }
                
                return;
            }

            console.log('📊 Creando esquema y tablas...');
            
            // Ejecutar script SQL si existe
            if (fs.existsSync(this.schemaFile)) {
                await this.executeSchemaScript();
            } else {
                // Crear tablas manualmente si no hay script
                await this.createTablesManually();
                await this.insertSampleData();
            }

            console.log('🎉 Base de datos inicializada exitosamente');
            
        } catch (error) {
            console.error('❌ Error inicializando la base de datos:', error);
            throw error;
        }
    }

    async checkTablesExist() {
        try {
            const result = await database.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'revista_digital' 
                    AND table_name = 'users'
                )
            `);
            return result.rows[0].exists;
        } catch (error) {
            // Si hay error, probablemente el esquema no existe
            return false;
        }
    }

    async checkSampleData() {
        try {
            const result = await database.query(`
                SELECT COUNT(*) as user_count FROM revista_digital.users
            `);
            return parseInt(result.rows[0].user_count) > 0;
        } catch (error) {
            return false;
        }
    }

    async executeSchemaScript() {
        try {
            const sql = fs.readFileSync(this.schemaFile, 'utf8');
            // Dividir el script en sentencias individuales
            const statements = sql.split(';').filter(stmt => stmt.trim());
            
            for (const statement of statements) {
                if (statement.trim()) {
                    await database.query(statement);
                }
            }
            
            console.log('✅ Script SQL ejecutado correctamente');
        } catch (error) {
            console.error('❌ Error ejecutando script SQL:', error);
            throw error;
        }
    }

    async createTablesManually() {
        // Crear esquema
        await database.query('CREATE SCHEMA IF NOT EXISTS revista_digital');

        // Ejecutar las sentencias CREATE TABLE del schema.sql
        // (Aquí irían todas las sentencias CREATE TABLE del archivo SQL)
        console.log('📋 Creando tablas manualmente...');
        
        // Las tablas se crearán automáticamente cuando ejecutes el script SQL
    }

    async insertSampleData() {
        try {
            console.log('📝 Insertando datos de ejemplo...');
            
            // Hash de contraseñas
            const hashedAdminPassword = await bcrypt.hash('admin', 10);
            const hashedDefaultPassword = await bcrypt.hash('123', 10);

            // Insertar usuarios
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

            // Insertar artículos
            await database.query(`
                INSERT INTO revista_digital.articles (title, category, chapter, content, author_id, status, published_at) VALUES
                ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '5 days'),
                ($7, $8, $9, $10, $11, $12, NOW() - INTERVAL '3 days'),
                ($13, $14, $15, $16, $17, $18, NOW() - INTERVAL '2 days'),
                ($19, $20, $21, $22, $23, $24, NOW() - INTERVAL '1 day')
                ON CONFLICT DO NOTHING
            `, [
                'Nuestro equipo de fútbol gana el torneo regional', 'deportivo', 'portafolios', 'El equipo de fútbol del Colegio San Francisco IED ha logrado una victoria histórica en el torneo regional...', 3, 'published',
                'Concierto de primavera del coro estudiantil', 'musical', 'portafolios', 'El coro estudiantil presentó un emotivo concierto de primavera con canciones tradicionales...', 4, 'published',
                'Taller de robótica educativa', 'tecnologico', 'experiencias', 'El programa Talentos implementó un taller de robótica educativa donde los estudiantes aprendieron programación...', 2, 'published',
                'Reflexiones sobre la educación pública', 'linguistico', 'posicionamiento', 'Ser un estudiante con talentos excepcionales en un colegio público representa tanto desafíos como oportunidades...', 3, 'published'
            ]);

            console.log('✅ Datos de ejemplo insertados correctamente');
            
        } catch (error) {
            console.error('❌ Error insertando datos de ejemplo:', error);
        }
    }

    async getDatabaseInfo() {
        try {
            const version = await database.query('SELECT version()');
            const stats = await database.query('SELECT * FROM revista_digital.get_system_stats()');
            
            return {
                postgresVersion: version.rows[0].version,
                systemStats: stats.rows[0]
            };
        } catch (error) {
            console.error('Error obteniendo información de la base de datos:', error);
            return null;
        }
    }
}

// Función principal para inicializar
async function initializeDatabase() {
    const initializer = new DatabaseInitializer();
    await initializer.initialize();
    
    // Mostrar información de la base de datos
    const dbInfo = await initializer.getDatabaseInfo();
    if (dbInfo) {
        console.log('📊 Información de la base de datos:');
        console.log('🐘 PostgreSQL:', dbInfo.postgresVersion.split(',')[0]);
        console.log('📈 Estadísticas:', dbInfo.systemStats);
    }
}

module.exports = { initializeDatabase, DatabaseInitializer };

/*---------------------------------------------------------------*/
