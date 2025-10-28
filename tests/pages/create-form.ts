import { Page, Locator, expect } from '@playwright/test';

export class CreateFormPage {
    readonly page: Page;
    
    // Los locators específicos los agregaremos después de usar codegen
    readonly form: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator(''); // TODO: Agregar selector del formulario
    }

    // Métodos de la página
    async isFormVisible() {
        await expect(this.form).toBeVisible();
        // TODO: Agregar validaciones adicionales específicas del formulario
    }

    async validateFormLoaded() {
        // TODO: Agregar validaciones para asegurar que estamos en el formulario correcto
        await this.page.waitForURL(process.env.APPSHEET_FORM_URL || '');
    }
}