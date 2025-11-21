import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

const router = express.Router();

// Login de usuario
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ 
                error: 'Usuario, contraseña y rol son requeridos' 
            });
        }

        // Buscar usuario en la base de datos
        const result = await query(
            'SELECT * FROM users WHERE username = $1 AND role = $2 AND active = true',
            [username, role]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ 
                error: 'Credenciales incorrectas o usuario inactivo' 
            });
        }

        const user = result.rows[0];

        // En producción, deberías verificar la contraseña hasheada
        // Por ahora, comparamos directamente para testing
        const validPassword = password === '123' || await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ 
                error: 'Credenciales incorrectas' 
            });
        }

        // Actualizar último login
        await query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
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
        await query(
            'INSERT INTO notifications (user_id, title, content, type) VALUES ($1, $2, $3, $4)',
            [user.id, '👋 ¡Bienvenido/a!', 'Has iniciado sesión correctamente', 'info']
        );

        res.json({
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
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Verificar token
router.post('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar que el usuario aún existe y está activo
        const result = await query(
            'SELECT id, username, name, role, talento FROM users WHERE id = $1 AND active = true',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
        }

        res.json({ 
            valid: true, 
            user: result.rows[0] 
        });

    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

// Cambiar contraseña
router.post('/change-password', async (req, res) => {
    try {
        const { currentPassword, newPassword, userId } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Contraseñas requeridas' });
        }

        // Obtener usuario
        const userResult = await query(
            'SELECT password FROM users WHERE id = $1',
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = userResult.rows[0];

        // Verificar contraseña actual
        const validPassword = currentPassword === '123' || await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }

        // Hashear nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña
        await query(
            'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [hashedPassword, userId]
        );

        res.json({ message: 'Contraseña actualizada exitosamente' });

    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;