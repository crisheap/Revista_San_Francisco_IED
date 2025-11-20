/*const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
            maxUses: 7500,
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.pool.on('connect', () => {
            console.log('✅ Nueva conexión establecida con Neon PostgreSQL');
        });

        this.pool.on('error', (err) => {
            console.error('❌ Error en el pool de conexiones:', err.message);
        });

        this.pool.on('acquire', () => {
            console.log('🔗 Cliente adquirido del pool');
        });

        this.pool.on('remove', () => {
            console.log('🔌 Cliente removido del pool');
        });
    }

    async testConnection() {
        let client;
        try {
            client = await this.pool.connect();
            console.log('🔌 Conectado a Neon PostgreSQL');
            
            const versionResult = await client.query('SELECT version()');
            console.log('🐘 PostgreSQL:', versionResult.rows[0].version.split(',')[0]);
            
            const timeResult = await client.query('SELECT NOW() as server_time');
            console.log('📅 Hora del servidor:', timeResult.rows[0].server_time);
            
            return true;
        } catch (error) {
            console.error('❌ Error de conexión a la base de datos:', error.message);
            
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

    async query(text, params = []) {
        const start = Date.now();
        let client;
        
        try {
            client = await this.pool.connect();
            const result = await client.query(text, params);
            const duration = Date.now() - start;
            
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
            
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    async transaction(callback) {
        const client = await this.pool.connect();
        
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

    getPoolStats() {
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount
        };
    }

    async close() {
        await this.pool.end();
        console.log('🔌 Conexión a la base de datos cerrada');
    }
}

// Crear instancia única
const database = new Database();

// Probar conexión al iniciar
(async () => {
    console.log('🔄 Inicializando conexión a la base de datos...');
    await database.testConnection();
})();

module.exports = database;*/

/*------------------------------------------------------------------- */

const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        // Configuración específica para Neon PostgreSQL
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.pool.on('connect', () => {
            console.log('✅ Conectado a Neon PostgreSQL');
        });

        this.pool.on('error', (err) => {
            console.error('❌ Error en pool de conexiones:', err.message);
        });
    }

    async testConnection() {
        let client;
        try {
            client = await this.pool.connect();
            const result = await client.query('SELECT NOW() as time');
            console.log('🕒 Hora de Neon:', result.rows[0].time);
            return true;
        } catch (error) {
            console.error('❌ Error conectando a Neon:', error.message);
            return false;
        } finally {
            if (client) client.release();
        }
    }

    async query(text, params = []) {
        let client;
        try {
            client = await this.pool.connect();
            const result = await client.query(text, params);
            return result;
        } catch (error) {
            console.error('❌ Error en query:', error.message);
            throw error;
        } finally {
            if (client) client.release();
        }
    }

    async transaction(callback) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

const database = new Database();
module.exports = database;