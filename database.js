// database.js - Conexión a Neon PostgreSQL optimizada y corregida
const { Pool } = require('pg');
require('dotenv').config();

// Validar que las variables de entorno estén cargadas
if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL no encontrada en variables de entorno');
}

// Configuración de conexión a Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necesario para Neon
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    // maxUses no es una opción válida en pg.Pool - removido
});

// Manejo mejorado de eventos del pool
pool.on('connect', () => {
    console.log('✅ Nueva conexión establecida con Neon PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error crítico en el pool de conexiones:', err.message);
});

pool.on('acquire', (client) => {
    console.log('🔗 Cliente adquirido del pool');
});

pool.on('remove', () => {
    console.log('🔌 Cliente removido del pool');
});

// Función robusta para probar la conexión
async function testConnection() {
    let client;
    try {
        client = await pool.connect();
        console.log('🔌 Conectado a Neon PostgreSQL');
        
        // Verificar versión y conexión
        const versionResult = await client.query('SELECT version()');
        console.log('🐘 PostgreSQL:', versionResult.rows[0].version.split(',')[0]);
        
        // Verificar hora del servidor
        const timeResult = await client.query('SELECT NOW() as server_time');
        console.log('📅 Hora del servidor:', timeResult.rows[0].server_time);
        
        // Verificar tablas existentes
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        console.log('📊 Tablas en la base de datos:', tablesResult.rows.map(row => row.table_name).join(', '));
        
        return true;
    } catch (error) {
        console.error('❌ Error de conexión a la base de datos:', error.message);
        
        // Información detallada para debugging
        if (error.code === '28P01') {
            console.error('🔐 Error de autenticación - Verifica usuario/contraseña');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('🌐 Error de conexión - Verifica la URL y el host');
        } else if (error.code === 'ENOTFOUND') {
            console.error('🔍 Host no encontrado - Verifica la URL de conexión');
        }
        
        return false;
    } finally {
        if (client) client.release();
    }
}

// Función de consulta mejorada con logging y manejo de errores
async function query(text, params = []) {
    const start = Date.now();
    let client;
    
    try {
        client = await pool.connect();
        const result = await client.query(text, params);
        const duration = Date.now() - start;
        
        // Log solo para queries que toman más de 100ms o en desarrollo
        if (duration > 100 || process.env.NODE_ENV === 'development') {
            console.log(`📊 Query ejecutada en ${duration}ms:`, 
                text.length > 100 ? text.substring(0, 100) + '...' : text);
        }
        
        return result;
    } catch (error) {
        const duration = Date.now() - start;
        console.error(`❌ Error en query (${duration}ms):`, {
            query: text.length > 200 ? text.substring(0, 200) + '...' : text,
            params: params.length > 0 ? params : 'Sin parámetros',
            error: error.message,
            code: error.code
        });
        
        // Relanzar error para manejo superior
        throw error;
    } finally {
        if (client) client.release();
    }
}

// Función para transacciones
async function transaction(callback) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error en transacción:', error.message);
        throw error;
    } finally {
        client.release();
    }
}

// Función para obtener estadísticas del pool
function getPoolStats() {
    return {
        totalCount: pool.totalCount,
        idleCount: pool.idleCount,
        waitingCount: pool.waitingCount
    };
}

// Verificar conexión al cargar el módulo
(async () => {
    console.log('🔄 Inicializando conexión a la base de datos...');
    const connected = await testConnection();
    if (connected) {
        console.log('🚀 Módulo de base de datos inicializado correctamente');
    } else {
        console.log('⚠️  Módulo de base de datos inicializado con errores de conexión');
    }
})();

module.exports = {
    query,
    pool,
    testConnection,
    transaction,
    getPoolStats
};