import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { CreateForm } from '../pages/create-form';


test.describe('Create Client Negative Tests', () => {
    // Usar el estado de autenticación guardado
    test.use({ storageState: 'playwright/.auth/user.json' });

    test('should show validation errors when submitting empty mandatory fields', async ({ page }) => {
       // Inicializar Page Objects
        const searchPage = new SearchPage(page);
        const createForm = new CreateForm(page);
        
        // 1. Navegar al formulario de creación y validar carga
        if (!process.env.APPSHEET_FORM_URL) {
            throw new Error('APPSHEET_FORM_URL environment variable is not set');
        }
        await page.goto(process.env.APPSHEET_FORM_URL as string);
        await searchPage.clickCreateButton();
        await createForm.validateFormLoaded();

        //2. Acción: Intentar guardar sin llenar campos mandatorios
        await createForm.validateSaveButtonVisible();
        await createForm.clickSave(); 
        
        // 3. Esperar brevemente a que aparezcan los mensajes de error
        await page.waitForTimeout(1000);

        // 4. Validar los mensajes de error para campos requeridos
        const errorMessage = 'This entry is required';
        await expect(page.getByText(errorMessage).first()).toBeVisible();
        
        // 5. Validar que permanecemos en el formulario
        await createForm.validateSaveButtonVisible();
        
        // 6. Contar la cantidad de mensajes de error (deberían ser 4: nombre comercial, empresa, RUT y país)
        const errorCount = await page.getByText(errorMessage).count();
        expect(errorCount).toBeGreaterThanOrEqual(4); 
    });
});