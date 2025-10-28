import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  
  // Sin timeout global para permitir autenticación manual
  timeout: 0,
  
  use: {
    // Eliminamos baseURL ya que usaremos URLs completas
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // Setup project (para autenticación)
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      timeout: 0, // Sin timeout para el proyecto de setup
    },
    
    // Proyecto principal con autenticación
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Usar el estado de autenticación guardado
        storageState: process.env.AUTH_FILE || 'playwright/.auth/user.json',
      },
      dependencies: ['setup'], // Asegura que la autenticación se ejecute primero
    },
  ],
});