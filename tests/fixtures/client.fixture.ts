import { faker } from '@faker-js/faker';
import { TaxIdGenerator } from '../utils/tax-id';

export interface ClientData {
    businessName: string;
    companyName: string;
    taxId: string;
    address: string;
    phone: string;
}

export class ClientFixture {
    static createClient(): ClientData {
        const timestamp = Date.now();
        return {
            businessName: `Test Company ${timestamp} ${faker.company.name()}`,
            companyName: `Legal Name ${timestamp} ${faker.company.name()}`,
            taxId: TaxIdGenerator.generate(),
            address: faker.location.streetAddress(),
            phone: `9${faker.string.numeric(8)}`, // Número móvil chileno: 9XXXXXXXX
        };
    }

    static createMultipleClients(count: number): ClientData[] {
        return Array.from({ length: count }, () => this.createClient());
    }
}