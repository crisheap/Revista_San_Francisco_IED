import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Validar conexión
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL no encontrada en variables de entorno');
    process.exit(1);
}

// Configuración optimizada para Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxUses: 7500,
});

// Eventos del pool
pool.on('connect', () => {
    console.log('✅ Nueva conexión establecida con Neon PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error en el pool de conexiones:', err.message);
});

// Función de consulta mejorada
export async function query(text, params = []) {
    const start = Date.now();
    let client;
    
    try {
        client = await pool.connect();
        const result = await client.query(text, params);
        const duration = Date.now() - start;
        
        if (duration > 100 || process.env.NODE_ENV === 'development') {
            console.log(`📊 Query ejecutada en ${duration}ms`);
        }
        
        return result;
    } catch (error) {
        console.error(`❌ Error en query:`, {
            error: error.message,
            code: error.code
        });
        throw error;
    } finally {
        if (client) client.release();
    }
}

// Función para transacciones
export async function transaction(callback) {
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

// Probar conexión al iniciar
export async function testConnection() {
    try {
        const result = await query('SELECT version(), NOW() as server_time');
        console.log('✅ Conectado a Neon PostgreSQL');
        console.log('🐘 PostgreSQL:', result.rows[0].version.split(',')[0]);
        console.log('📅 Hora del servidor:', result.rows[0].server_time);
        return true;
    } catch (error) {
        console.error('❌ Error de conexión a Neon:', error.message);
        return false;
    }
}

export { pool };