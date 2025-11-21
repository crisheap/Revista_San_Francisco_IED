import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

const router = express.Router();

// Obtener todos los usuarios (solo admin)
router.get('/', async (req, res) => {
    try {
        const result = await query(`
            SELECT id, username, name, role, talento, active, last_login, created_at
            FROM users 
            ORDER BY created_at DESC
        `);

        res.json({ users: result.rows });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear nuevo usuario (solo admin)
router.post('/', async (req, res) => {
    try {
        const { username, password, name, role, talento } = req.body;

        if (!username || !password || !name || !role) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'El nombre de usuario ya existe' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        const result = await query(
            `INSERT INTO users (username, password, name, role, talento) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, username, name, role, talento, active, created_at`,
            [username, hashedPassword, name, role, talento || null]
        );

        res.status(201).json({ 
            message: 'Usuario creado exitosamente',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, talento, active } = req.body;

        const result = await query(
            `UPDATE users 
             SET name = $1, role = $2, talento = $3, active = $4, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $5 
             RETURNING id, username, name, role, talento, active, updated_at`,
            [name, role, talento, active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ 
            message: 'Usuario actualizado exitosamente',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener estadísticas de usuarios
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await query('SELECT COUNT(*) FROM users');
        const activeUsers = await query('SELECT COUNT(*) FROM users WHERE active = true');
        const usersByRole = await query(`
            SELECT role, COUNT(*) as count 
            FROM users 
            WHERE active = true 
            GROUP BY role
        `);

        res.json({
            total: parseInt(totalUsers.rows[0].count),
            active: parseInt(activeUsers.rows[0].count),
            byRole: usersByRole.rows
        });

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;