/*const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        // Buscar usuario
        const result = await database.query(
            'SELECT * FROM revista_digital.users WHERE username = $1 AND role = $2 AND active = true',
            [username, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas o usuario inactivo'
            });
        }

        const user = result.rows[0];

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // Actualizar último login
        await database.query(
            'UPDATE revista_digital.users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                role: user.role,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Crear notificación de login
        await database.query(
            'INSERT INTO revista_digital.notifications (user_id, title, content, type) VALUES ($1, $2, $3, $4)',
            [user.id, '👋 ¡Bienvenido/a!', `Has iniciado sesión correctamente como ${user.role}`, 'info']
        );

        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                talento: user.talento
            }
        });

    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Verificar token
router.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar que el usuario aún existe
        const result = await database.query(
            'SELECT id, username, name, role, talento, active FROM revista_digital.users WHERE id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            user: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Error verificando token:', error);
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
});

// Cambiar contraseña
router.post('/change-password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Obtener usuario actual
        const userResult = await database.query(
            'SELECT password FROM revista_digital.users WHERE id = $1',
            [decoded.id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const user = userResult.rows[0];

        // Verificar contraseña actual
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña actual incorrecta'
            });
        }

        // Hash nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña
        await database.query(
            'UPDATE revista_digital.users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [hashedNewPassword, decoded.id]
        );

        res.json({
            success: true,
            message: 'Contraseña cambiada exitosamente'
        });

    } catch (error) {
        console.error('❌ Error cambiando contraseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;*/



/*------------------------------------------------------------- */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');

const router = express.Router();

// Login - Solo verifica en Neon
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Buscar usuario SOLO en Neon
        const result = await database.query(
            'SELECT * FROM users WHERE username = $1 AND role = $2 AND active = true',
            [username, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado en el sistema'
            });
        }

        const user = result.rows[0];

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        // Actualizar último login en Neon
        await database.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        // Generar token
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                role: user.role,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Crear notificación en Neon
        await database.query(
            'INSERT INTO notifications (user_id, title, content, type) VALUES ($1, $2, $3, $4)',
            [user.id, '👋 ¡Bienvenido/a!', `Has iniciado sesión correctamente`, 'info']
        );

        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role,
                talento: user.talento
            }
        });

    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});

// Verificar token - Solo verifica en Neon
router.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token requerido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar que el usuario existe en Neon
        const result = await database.query(
            'SELECT id, username, name, role, talento, active FROM users WHERE id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.json({ success: true, user: result.rows[0] });

    } catch (error) {
        res.status(401).json({ success: false, message: 'Token inválido' });
    }
});

module.exports = router;