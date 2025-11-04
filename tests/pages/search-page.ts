import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    
    // Definiremos los locators principales
    readonly createButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.createButton = page.getByRole('button', { name: 'Crear' });
        this.searchInput = page.getByRole('textbox', { name: 'Buscar' });
    }

    // Métodos de la página
    async navigateToSearch() {
        if (!process.env.APPSHEET_SEARCH_URL) {
            throw new Error('APPSHEET_SEARCH_URL environment variable is not set');
        }
        
        // Navegar con opciones de espera
        await this.page.goto(process.env.APPSHEET_SEARCH_URL, {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        // Asegurarnos de que el contenido principal está cargado
        await this.page.waitForLoadState('domcontentloaded');
        
        // Esperar a que los elementos clave estén visibles
        await this.createButton.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.searchInput.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }

    async clickCreateButton() {
        // Esperar a que el botón esté visible y habilitado
        await this.createButton.waitFor({ 
            state: 'visible',
            timeout: 20000
        });
        
        // Verificar que el botón es interactuable
        await expect(this.createButton).toBeEnabled();
      
        await this.createButton.click();
        
        // Verificar que llegamos a la URL del formulario
        if (!process.env.APPSHEET_FORM_URL) {
            throw new Error('APPSHEET_FORM_URL environment variable is not set');
        }
        
        // Esperamos a que aparezca el botón Save, que indica que el formulario está listo
        await this.page.getByRole('button', { name: 'Save' }).waitFor({
            state: 'visible',
            timeout: 30000
        });
        
    }

    async searchForClient(searchText: string) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchInput.fill(searchText);
        // TODO: Agregar lógica adicional si es necesario (por ejemplo, presionar Enter)
    }

    async waitForPageReady() {
        // Esperar a que los elementos clave estén visibles
        await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    }
}