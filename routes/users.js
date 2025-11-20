const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');

const router = express.Router();

// Middleware para verificar admin
const requireAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de acceso requerido'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Se requieren permisos de administrador'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};

// Obtener todos los usuarios (solo admin)
router.get('/', requireAdmin, async (req, res) => {
    try {
        console.log('📋 Obteniendo lista de usuarios...');
        
        const result = await database.query(`
            SELECT id, username, name, role, talento, active, last_login, created_at
            FROM revista_digital.users 
            ORDER BY created_at DESC
        `);

        console.log(`✅ Encontrados ${result.rows.length} usuarios`);

        res.json({
            success: true,
            users: result.rows
        });

    } catch (error) {
        console.error('❌ Error obteniendo usuarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Crear nuevo usuario (solo admin)
router.post('/', requireAdmin, async (req, res) => {
    try {
        const { username, password, name, role, talento } = req.body;

        console.log('👤 Creando nuevo usuario:', { username, name, role });

        if (!username || !password || !name || !role) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await database.query(
            'SELECT id FROM revista_digital.users WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario ya existe'
            });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await database.query(`
            INSERT INTO revista_digital.users (username, password, name, role, talento)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, name, role, talento, active, created_at
        `, [username, hashedPassword, name, role, talento || null]);

        const newUser = result.rows[0];
        
        console.log('✅ Usuario creado exitosamente:', newUser.username);

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            user: newUser
        });

    } catch (error) {
        console.error('❌ Error creando usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar usuario (solo admin)
router.put('/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, talento, active } = req.body;

        console.log('✏️ Actualizando usuario:', { id, name, role });

        const result = await database.query(`
            UPDATE revista_digital.users 
            SET name = $1, role = $2, talento = $3, active = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING id, username, name, role, talento, active, last_login, created_at
        `, [name, role, talento, active, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        console.log('✅ Usuario actualizado:', result.rows[0].username);

        res.json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error actualizando usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Resetear contraseña (solo admin)
router.post('/:id/reset-password', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: 'La nueva contraseña es requerida'
            });
        }

        console.log('🔑 Reseteando contraseña para usuario:', id);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await database.query(`
            UPDATE revista_digital.users 
            SET password = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING id, username, name
        `, [hashedPassword, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        console.log('✅ Contraseña reseteada para:', result.rows[0].username);

        res.json({
            success: true,
            message: 'Contraseña reseteada exitosamente'
        });

    } catch (error) {
        console.error('❌ Error reseteando contraseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener estadísticas de usuarios (solo admin)
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        console.log('📊 Obteniendo estadísticas de usuarios...');
        
        const totalUsers = await database.query('SELECT COUNT(*) FROM revista_digital.users');
        const activeUsers = await database.query('SELECT COUNT(*) FROM revista_digital.users WHERE active = true');
        const usersByRole = await database.query('SELECT role, COUNT(*) FROM revista_digital.users GROUP BY role');
        
        const today = new Date().toISOString().split('T')[0];
        const recentLogins = await database.query(
            'SELECT COUNT(*) FROM revista_digital.users WHERE last_login::date = $1',
            [today]
        );

        const stats = {
            total: parseInt(totalUsers.rows[0].count),
            active: parseInt(activeUsers.rows[0].count),
            byRole: usersByRole.rows,
            recentLogins: parseInt(recentLogins.rows[0].count)
        };

        console.log('✅ Estadísticas obtenidas:', stats);

        res.json({
            success: true,
            stats: stats
        });

    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;