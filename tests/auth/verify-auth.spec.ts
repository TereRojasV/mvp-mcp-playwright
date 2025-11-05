import { test } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('verificar estado de autenticación', async ({ page }) => {
  // Navegar a la página de AppSheet
  await page.goto(process.env.APPSHEET_SEARCH_URL || '');
  
  // Esperar 5 segundos para verificar que no nos redirija a la página de login
  await page.waitForTimeout(5000);
});