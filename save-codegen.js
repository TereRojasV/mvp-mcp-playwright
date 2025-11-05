const { exec } = require('child_process');
const fs = require('fs');

// Ejecutar codegen y capturar su salida
const command = 'npx playwright codegen --browser chromium --load-storage=playwright/.auth/user.json "$(node get-url.js)"';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  
  // Guardar la salida en un archivo
  fs.writeFileSync('tests/clients/temp_recording.spec.ts', stdout);
  console.log('Código guardado en temp_recording.spec.ts');
});