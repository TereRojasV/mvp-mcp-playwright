import { type Page, type Locator, expect } from '@playwright/test';

export class CreateForm {
    readonly page: Page;
    readonly businessNameInput: Locator;
    readonly companyNameInput: Locator;
    readonly taxIdInput: Locator;
    readonly countryInput: Locator;
    readonly countryOption: Locator;
    readonly addressInput: Locator;
    readonly phoneInput: Locator;
    readonly saveButton: Locator;

     

    constructor(page: Page) {
        this.page = page;
        this.businessNameInput = page.getByRole('textbox', { name: 'Nombre comercial o de fantasía' });
        this.companyNameInput = page.getByRole('textbox', { name: 'Nombre empresa o razón social' });
        this.taxIdInput = page.getByRole('textbox', { name: 'RUC / RUT' });
        this.countryInput = page.getByRole('textbox', { name: 'País' });
        this.countryOption = page.locator('.b-jss464').first();
        this.addressInput = page.getByRole('textbox', { name: 'Dirección empresa' });
        this.phoneInput = page.getByRole('textbox', { name: 'Fono contacto' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    

    async validateFormLoaded(): Promise<void> {
        // Verificar que los elementos clave del formulario están visibles
        await expect(this.businessNameInput).toBeVisible();
        await expect(this.companyNameInput).toBeVisible();
        await expect(this.saveButton).toBeVisible();
        
        // Verificar que los campos están habilitados para interactuar
        await expect(this.businessNameInput).toBeEnabled();
        await expect(this.companyNameInput).toBeEnabled();
    }

    async isFormVisible(): Promise<void> {
        await expect(this.businessNameInput).toBeVisible();
    }

    async fillBusinessName(name: string): Promise<void> {
        await this.businessNameInput.fill(name);
    }

    async fillCompanyName(name: string): Promise<void> {
        await this.companyNameInput.click();
        await this.companyNameInput.fill(name);
    }

    async fillTaxId(taxId: string): Promise<void> {
        await this.taxIdInput.click();
        await this.taxIdInput.fill(taxId);
    }

    async selectCountry(): Promise<void> {
        await this.countryInput.click();
        await this.countryOption.click();
    }

    async fillAddress(address: string): Promise<void> {
        await this.addressInput.click();
        await this.addressInput.fill(address);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneInput.click();
        await this.phoneInput.fill(phone);
    }

    async validateSaveButtonVisible(): Promise<void> {
        await expect(this.saveButton).toBeVisible();
    }

    async clickSave(): Promise<void> {
        await this.saveButton.click();
    }

    async validateRequiredFieldError(field: Locator, fieldName: string): Promise<void> {
        // Obtener información detallada del campo y su contexto
        const fieldInfo = await field.evaluate(el => {
            const parent = el.parentElement;
            const grandParent = parent?.parentElement;
            
            return {
                fieldId: el.id,
                fieldClasses: el.className,
                parentClasses: parent?.className || 'No parent classes',
                grandParentClasses: grandParent?.className || 'No grandparent classes',
                nearbyText: Array.from(parent?.querySelectorAll('*') || [])
                    .map(node => node.textContent)
                    .filter(text => text)
                    .join(', '),
                html: parent?.innerHTML || 'No parent HTML'
            };
        });



        // Intentar encontrar el mensaje de error
        const errorMessage = await field.evaluate(el => {
            const parent = el.closest('.form-group') || el.parentElement;
            const errorElements = parent?.querySelectorAll('*');
            const errors = Array.from(errorElements || [])
                .map(node => node.textContent)
                .filter(text => text?.includes('required'))
                .join(', ');
            
            return errors;
        });


        expect(errorMessage).toBe('this entry is required');
    }

    async validateAllRequiredFieldErrors(): Promise<void> {
        // Validar mensajes de error para todos los campos requeridos
        await this.validateRequiredFieldError(this.businessNameInput, 'Nombre comercial o de fantasía');
        await this.validateRequiredFieldError(this.companyNameInput, 'Nombre empresa o razón social');
        await this.validateRequiredFieldError(this.taxIdInput, 'RUC / RUT');
        await this.validateRequiredFieldError(this.countryInput, 'País');
    }

    async validateSpecificRequiredFieldError(fieldName: string): Promise<void> {
        // Esperamos un momento para que aparezcan los mensajes de error
        await this.page.waitForTimeout(1000);

        // Localizar el mensaje de error
        const errorLocator = this.page.locator('text="this entry is required"')
            .filter({ has: this.page.locator(`[aria-label="${fieldName}"]`) });

        // Validar que el mensaje de error está visible
        await expect(errorLocator).toBeVisible({
            timeout: 5000
        });
        
        console.log(`Mensaje de error validado para campo: ${fieldName}`);
    }

    async validateSuccessfulCreation(): Promise<void> {
        // Verificar que el botón Save desaparece (indica que el formulario se cerró)
        await expect(this.saveButton).toBeHidden({ timeout: 5000 });
    }
}
