import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { CreateForm } from '../pages/create-form';
import { ClientFixture, type ClientData } from '../fixtures/client.fixture';

test.use({
  storageState: process.env.AUTH_FILE || 'playwright/.auth/user.json'
});

test.describe('Create Client Tests', () => {
  let searchPage: SearchPage;
  let createFormPage: CreateForm;
  let testClient: ClientData;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    createFormPage = new CreateForm(page);
    testClient = ClientFixture.createClient();
  });

  test('should create a new client with valid data', async ({ page }) => {
        console.log('Iniciando test de creación de cliente');
        
        // 1. Navegar al formulario de creación y validar carga
        // 1. Navegar al formulario de creación y validar carga
        if (!process.env.APPSHEET_FORM_URL) {
            throw new Error('APPSHEET_FORM_URL environment variable is not set');
        }
        await page.goto(process.env.APPSHEET_FORM_URL as string);
        await searchPage.clickCreateButton();
        await createFormPage.validateFormLoaded();

        // 2. Llenar el formulario con datos válidos
        await createFormPage.fillBusinessName(testClient.businessName);
        await createFormPage.fillCompanyName(testClient.companyName);
        await createFormPage.fillTaxId(testClient.taxId);
        await createFormPage.selectCountry();
        await createFormPage.fillAddress(testClient.address);
        await createFormPage.fillPhone(testClient.phone);
        await createFormPage.validateSaveButtonVisible();
        await createFormPage.clickSave();
        
        // 3. Validar que el cliente se creó correctamente
        await expect(
            createFormPage.validateSuccessfulCreation(),
            'El formulario debería cerrarse después de guardar'
        ).resolves.not.toThrow();
  });
});
