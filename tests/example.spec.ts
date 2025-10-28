import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // Navegar a Google como ejemplo
  await page.goto('https://www.google.com');
  
  // Verificar que el título contiene 'Google'
  await expect(page).toHaveTitle(/Google/);
  
  // Verificar que el campo de búsqueda está visible
  const searchInput = await page.getByRole('combobox', { name: 'Buscar' });
  await expect(searchInput).toBeVisible();
});