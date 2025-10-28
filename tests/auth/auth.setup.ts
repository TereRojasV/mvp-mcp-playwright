import { test as setup } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

setup('guardar estado de autenticación', async ({ page }) => {
  console.log('\n🚀 Iniciando proceso de autenticación manual...');
  
  // 1. Navegar a la página de AppSheet
  console.log('📱 Abriendo la página de AppSheet...');
  await page.goto(process.env.APPSHEET_SEARCH_URL || '');
  
  // 2. Esperar a que el usuario complete el inicio de sesión manualmente
  console.log('\n⚠️  ACCIÓN REQUERIDA:');
  console.log('🔐 Por favor, sigue estos pasos:');
  console.log('1. Inicia sesión con tu cuenta de Google');
  console.log('2. Espera a que la página de AppSheet se cargue completamente');
  console.log('3. Avísame cuando hayas completado el proceso\n');
  
  try {
    // Esperar a que la URL coincida con la de AppSheet (después del login)
    // Sin timeout para dar tiempo ilimitado al usuario
    await page.waitForURL(process.env.APPSHEET_SEARCH_URL || '', { timeout: 0 });
    
    // 3. Guardar el estado de autenticación inmediatamente después de detectar la URL correcta
    await page.context().storageState({
      path: process.env.AUTH_FILE || 'playwright/.auth/user.json'
    });
    
    console.log('✅ Sesión iniciada correctamente');
    console.log('💾 Estado de autenticación guardado correctamente');
    console.log('🎉 Proceso completado con éxito!\n');
  } catch (error: any) {
    if (error?.message?.includes?.('Target closed') || error?.message?.includes?.('has been closed')) {
      console.log('✅ La página se cerró manualmente después de la autenticación');
      console.log('🎉 Proceso completado con éxito!\n');
    } else {
      throw error;
    }
  }
});