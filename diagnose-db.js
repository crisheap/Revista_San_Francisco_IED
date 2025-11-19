// diagnose-db.js - Diagnóstico completo de la base de datos
const { query, testConnection } = require('./database');

async function fullDiagnosis() {
    console.log('🩺 INICIANDO DIAGNÓSTICO COMPLETO DE LA BASE DE DATOS');
    console.log('=====================================================\n');

    // 1. Probar conexión básica
    console.log('1. 🔌 Probando conexión...');
    const connected = await testConnection();
    if (!connected) {
        console.log('❌ No se puede continuar - Conexión fallida');
        return;
    }
    console.log('✅ Conexión exitosa\n');

    // 2. Verificar usuarios específicos
    console.log('2. 👥 Verificando usuarios...');
    try {
        const users = await query(`
            SELECT 
                id, 
                username, 
                name, 
                role, 
                active,
                LENGTH(password) as password_length,
                last_login
            FROM users 
            ORDER BY id
        `);

        console.log(`📊 Total de usuarios: ${users.rows.length}`);
        
        users.rows.forEach(user => {
            console.log(`   👤 ${user.username} (${user.role}) - Activo: ${user.active} - Pass: ${'*'.repeat(user.password_length)}`);
        });

        // Verificar usuario admin específicamente
        const admin = users.rows.find(u => u.username === 'admin');
        if (admin) {
            console.log('\n   ✅ ADMIN ENCONTRADO:');
            console.log(`      Usuario: ${admin.username}`);
            console.log(`      Rol: ${admin.role}`);
            console.log(`      Activo: ${admin.active}`);
            console.log(`      Longitud password: ${admin.password_length}`);
        } else {
            console.log('\n   ❌ ADMIN NO ENCONTRADO');
        }

    } catch (error) {
        console.log('❌ Error verificando usuarios:', error.message);
    }

    // 3. Probar login simulado
    console.log('\n3. 🔐 Probando login simulado...');
    try {
        const testUsers = [
            { username: 'admin', password: 'admin', role: 'admin' },
            { username: 'docente1', password: '123', role: 'teacher' },
            { username: 'estudiante1', password: '123', role: 'student' }
        ];

        for (const testUser of testUsers) {
            const result = await query(
                `SELECT id, username, password, role, active 
                 FROM users 
                 WHERE username = $1 AND role = $2 AND active = true`,
                [testUser.username, testUser.role]
            );

            if (result.rows.length > 0) {
                const user = result.rows[0];
                const passwordMatch = testUser.password === user.password;
                console.log(`   ${passwordMatch ? '✅' : '❌'} ${testUser.username}: ${passwordMatch ? 'CONTRASEÑA CORRECTA' : 'CONTRASEÑA INCORRECTA'}`);
            } else {
                console.log(`   ❌ ${testUser.username}: USUARIO NO ENCONTRADO`);
            }
        }

    } catch (error) {
        console.log('❌ Error en prueba de login:', error.message);
    }

    console.log('\n=====================================================');
    console.log('🩺 DIAGNÓSTICO COMPLETADO');
}

// Ejecutar diagnóstico
fullDiagnosis().catch(console.error);