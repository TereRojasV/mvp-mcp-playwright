import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { CreateForm } from '../pages/create-form';
import { ClientFixture, type ClientData } from '../fixtures/client.fixture';

test.describe('Update Client Tests', () => {
    // Configuración de autenticación
    test.use({ 
        storageState: process.env.AUTH_FILE || 'playwright/.auth/user.json'
    });

    // Declaración de Page Objects y datos
    let createFormPage: CreateForm;
    let existingClient: ClientData;
    let updatedClientData: ClientData;

    // Configuración inicial antes de cada test
    test.beforeEach(async ({ page }) => {
        // Inicializar Page Objects
        createFormPage = new CreateForm(page);

        // Crear datos para el cliente existente y sus actualizaciones
        existingClient = ClientFixture.createClient();
        updatedClientData = {
            ...existingClient,
            businessName: `${existingClient.businessName} (Actualizado)`,
            phone: '912345678'
        };
    });

    test('should update client information successfully', async ({ page }) => {
        // 1. Preparación: Navegar a la página principal
        if (!process.env.APPSHEET_FORM_URL) {
            throw new Error('APPSHEET_FORM_URL environment variable is not set');
        }
        await page.goto(process.env.APPSHEET_FORM_URL as string);

        console.log('Navegando a la página de búsqueda de clientes');

        // 2. Buscar el cliente existente
        const searchInput = page.getByRole('textbox', { name: 'Search Clientes' });
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.click();
        await searchInput.fill('RIJK ZWAAN CHILE LIMITADA');
        
        // Esperar a que los resultados de búsqueda se actualicen y filtren
        await page.waitForTimeout(2000);
        
        // Usando una expresión regular más específica para encontrar el cliente
        const rowLocator = page.getByRole('button').filter({ 
            hasText: 'RIJK ZWAAN CHILE LIMITADA' 
        });
        
        // Esperar a que el elemento sea visible y hacer clic
        await rowLocator.waitFor({ state: 'visible', timeout: 10000 });
        await rowLocator.click();
        
        console.log('Cliente encontrado, procediendo a la edición');
        await page.getByRole('button', { name: 'Editar' }).click();
        await page.getByRole('textbox', { name: 'Fono contacto' }).click();
        await page.getByRole('textbox', { name: 'Fono contacto' }).fill('909090909090');
        await page.getByRole('button', { name: 'Save' }).click();
        
      
        
        
        // 8. Verificar que los cambios se guardaron
        await expect(
            createFormPage.validateSuccessfulCreation(),
            'El formulario debería cerrarse después de guardar'
        ).resolves.not.toThrow();

        
    });
});