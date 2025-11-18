// database.js - Conexión a Neon PostgreSQL con variables de entorno
const { Pool } = require('pg');
const config = require('./config');

// Configuración de conexión a Neon desde variables de entorno
const pool = new Pool({
    connectionString: config.database.connectionString,
    ssl: config.database.ssl,
    ...config.database.pool
});

// Verificar conexión
pool.on('connect', () => {
    console.log('✅ Conectado a la base de datos Neon PostgreSQL');
    console.log(`📊 Entorno: ${config.server.nodeEnv}`);
});

pool.on('error', (err) => {
    console.error('❌ Error en la conexión a la base de datos:', err);
});

// Función para probar la conexión
async function testConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT version()');
        console.log('🔌 Versión de PostgreSQL:', result.rows[0].version);
        client.release();
        return true;
    } catch (error) {
        console.error('❌ Error probando conexión a la base de datos:', error);
        return false;
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
    testConnection
};
