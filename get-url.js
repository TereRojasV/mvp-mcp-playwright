const fs = require('fs');
const path = require('path');

// Leer el archivo .env manualmente
const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');

// Encontrar la línea con APPSHEET_SEARCH_URL
const match = envFile.match(/^APPSHEET_SEARCH_URL=(.+)$/m);

if (!match) {
    console.error('APPSHEET_SEARCH_URL not found in .env');
    process.exit(1);
}

// Escribir solo la URL, sin ningún otro texto
process.stdout.write(match[1]);