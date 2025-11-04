/**
 * Utilidad para generar RUT chileno válido para pruebas
 */
export class TaxIdGenerator {
    /**
     * Genera un RUT chileno válido que comienza con 76
     * @returns string RUT con formato 76XXXXXX-Y (donde Y es el dígito verificador)
     */
    static generate(): string {
        // Genera un número aleatorio entre 76000000 y 76999999
        const rut = 76000000 + Math.floor(Math.random() * 1000000);
        
        // Calcula el dígito verificador
        let suma = 0;
        let multiplicador = 2;
        let rutTemp = rut;
        
        while (rutTemp > 0) {
            const digito = rutTemp % 10;
            suma += digito * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
            rutTemp = Math.floor(rutTemp / 10);
        }
        
        const dv = 11 - (suma % 11);
        const digitoVerificador = dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
        
        return `${rut}-${digitoVerificador}`;
    }
}