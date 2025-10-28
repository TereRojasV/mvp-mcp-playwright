import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';
import { CreateFormPage } from '../pages/create-form';

test.describe('Cliente Invoice Tests', () => {
    let searchPage: SearchPage;
    let createFormPage: CreateFormPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        createFormPage = new CreateFormPage(page);
    });

    test('should navigate to create form from search page', async ({ page }) => {
        // Navegar a la página de búsqueda
        await searchPage.navigateToSearch();
        
        // TODO: Agregar validaciones de página de búsqueda (las completaremos con codegen)
        
        // Hacer clic en el botón crear
        await searchPage.clickCreateButton();
        
        // Validar que estamos en el formulario
        await createFormPage.validateFormLoaded();
        await createFormPage.isFormVisible();
    });
});