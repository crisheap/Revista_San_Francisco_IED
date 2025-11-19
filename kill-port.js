// kill-port.js - Script para matar procesos en un puerto específico
const { exec } = require('child_process');
const port = process.argv[2] || '10000';

if (!port) {
    console.log('❌ Por favor especifica un puerto: node kill-port.js [puerto]');
    process.exit(1);
}

console.log(`🔄 Matando proceso en el puerto ${port}...`);

// Comando para Windows
const command = process.platform === 'win32' 
    ? `netstat -ano | findstr :${port}`
    : `lsof -ti:${port}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`✅ No hay procesos ejecutándose en el puerto ${port}`);
        process.exit(0);
    }

    if (process.platform === 'win32') {
        // Para Windows
        const lines = stdout.split('\n').filter(line => line.includes('LISTENING'));
        if (lines.length > 0) {
            const pid = lines[0].trim().split(/\s+/).pop();
            console.log(`🔫 Matando proceso PID: ${pid}`);
            exec(`taskkill /PID ${pid} /F`, (killError) => {
                if (killError) {
                    console.log('❌ Error matando proceso:', killError.message);
                } else {
                    console.log(`✅ Proceso ${pid} eliminado`);
                }
            });
        }
    } else {
        // Para Linux/Mac
        const pids = stdout.trim().split('\n');
        pids.forEach(pid => {
            console.log(`🔫 Matando proceso PID: ${pid}`);
            exec(`kill -9 ${pid}`, (killError) => {
                if (killError) {
                    console.log('❌ Error matando proceso:', killError.message);
                } else {
                    console.log(`✅ Proceso ${pid} eliminado`);
                }
            });
        });
    }
});