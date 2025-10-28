import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    
    // Definiremos los locators principales
    readonly createButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Inicializamos los locators (los selectores exactos los obtendremos con codegen)
        this.createButton = page.locator(''); // TODO: Agregar selector del botón crear
        this.searchInput = page.locator('');  // TODO: Agregar selector del campo de búsqueda
    }

    // Métodos de la página
    async navigateToSearch() {
        await this.page.goto(process.env.APPSHEET_SEARCH_URL || '');
        // TODO: Agregar validaciones de que la página cargó correctamente
    }

    async clickCreateButton() {
        await this.createButton.click();
        // TODO: Agregar espera o validación necesaria después del clic
    }

    async searchForClient(searchText: string) {
        await this.searchInput.fill(searchText);
        // TODO: Agregar lógica adicional si es necesario (por ejemplo, presionar Enter)
    }
}