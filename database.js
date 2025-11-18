// database.js - Conexión a Neon PostgreSQL optimizada para producción
const { Pool } = require('pg');
require('dotenv').config();

// Configuración de conexión a Neon desde variables de entorno
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20, // máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    maxUses: 7500, // reconectar después de 7500 consultas
});

// Manejo de eventos del pool
pool.on('connect', (client) => {
    console.log('✅ Nueva conexión establecida con la base de datos');
});

pool.on('error', (err, client) => {
    console.error('❌ Error en el pool de conexiones:', err);
});

pool.on('remove', (client) => {
    console.log('🔌 Cliente removido del pool');
});

// Función para probar la conexión
async function testConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT version(), NOW() as server_time');
        console.log('🔌 Conexión a PostgreSQL exitosa:');
        console.log('   📅 Hora del servidor:', result.rows[0].server_time);
        console.log('   🐘 Versión:', result.rows[0].version.split(',')[0]);
        client.release();
        return true;
    } catch (error) {
        console.error('❌ Error probando conexión a la base de datos:', error.message);
        return false;
    }
}

// Función de consulta mejorada con manejo de errores
async function query(text, params) {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`📊 Query ejecutada en ${duration}ms:`, text.substring(0, 100) + '...');
        return result;
    } catch (error) {
        console.error('❌ Error en query:', {
            query: text,
            params: params,
            error: error.message
        });
        throw error;
    }
}

// Función para obtener un cliente del pool (para transacciones)
async function getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    
    // Establecer un timeout para el cliente
    const timeout = setTimeout(() => {
        console.error('⏰ Timeout del cliente de base de datos');
        client.release();
    }, 10000);
    
    client.release = () => {
        clearTimeout(timeout);
        client.query = query;
        client.release = release;
        return release.apply(client);
    };
    
    return client;
}

module.exports = {
    query,
    pool,
    getClient,
    testConnection
};
