// create-icons.js - Script para crear iconos placeholder
const fs = require('fs');
const path = require('path');

// Crear carpeta icons si no existe
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
    console.log('✅ Carpeta icons creada');
}

// Tamaños de iconos requeridos
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// SVG base para los iconos (placeholder simple)
const createIconSVG = (size, text) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1e3a8a"/>
  <circle cx="50%" cy="40%" r="30%" fill="#f59e0b"/>
  <text x="50%" y="75%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/8}">${text}</text>
</svg>
`;

console.log('🎨 Creando iconos placeholder...');

iconSizes.forEach(size => {
    const svgContent = createIconSVG(size, 'CSF');
    const filePath = path.join(iconsDir, `icon-${size}x${size}.png`);
    
    // Para producción, vamos a crear archivos .svg temporalmente
    const svgFilePath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    fs.writeFileSync(svgFilePath, svgContent);
    console.log(`✅ Icono ${size}x${size} creado`);
});

console.log('🎯 Iconos placeholder creados exitosamente');