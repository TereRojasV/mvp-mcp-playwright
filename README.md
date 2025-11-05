# QA E2E Invoices Cliente - Playwright

Este proyecto contiene las pruebas end-to-end automatizadas para el módulo de Invoices Cliente utilizando Playwright.

## Prerrequisitos

- Node.js
- Playwright
- Git

## Instalación

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno en un archivo `.env`:

```
APPSHEET_SEARCH_URL=<URL de la página de búsqueda>
APPSHEET_FORM_URL=<URL del formulario>
AUTH_FILE=playwright/.auth/user.json
```

## Autenticación

El proyecto utiliza autenticación basada en estado. Para configurar:

1. Ejecutar el script de autenticación:
   ```bash
   npx playwright test tests/auth/auth.setup.ts --headed
   ```
2. Seguir las instrucciones en pantalla para iniciar sesión manualmente
3. El estado de autenticación se guardará automáticamente

Para verificar la autenticación:
```bash
npx playwright test tests/auth/verify-auth.spec.ts
```

## Estructura del Proyecto

```
├── tests/                    # Directorio de pruebas
│   ├── auth/                # Scripts de autenticación
│   ├── clients/             # Tests de clientes
│   ├── pages/               # Page Objects
│   └── fixtures/            # Fixtures y datos de prueba
├── test-results/            # Resultados de pruebas y capturas
├── artifacts/               # Archivos generados durante pruebas
├── playwright.config.ts     # Configuración de Playwright
└── package.json            # Dependencias y scripts
```

### Page Objects

El proyecto sigue el patrón Page Object Model:

- `search-page.ts`: Maneja interacciones en la página de búsqueda
- `create-form.ts`: Maneja interacciones en el formulario de creación

## Tests Implementados

1. **Autenticación**
   - `auth.setup.ts`: Configuración inicial de autenticación
   - `verify-auth.spec.ts`: Verificación del estado de autenticación

2. **Clientes**
   - `create-client.spec.ts`: Creación exitosa de cliente
   - `create-client-negative.spec.ts`: Validaciones de campos requeridos

## Ejecución de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con navegador visible
npm run test:headed

# Ver reporte de pruebas
npm run test:report
```

## Desarrollo

1. Crear una nueva rama desde `main`:
   ```bash
   git checkout -b feature/nombre-caracteristica
   ```

2. Ejecutar pruebas localmente antes de hacer push
3. Crear Pull Request cuando los cambios estén listos

## Scripts Disponibles

- `npm test`: Ejecuta todas las pruebas
- `npm run test:headed`: Ejecuta pruebas con navegador visible
- `npm run test:report`: Muestra el reporte HTML de las pruebas

## Mejores Prácticas

1. Mantener los Page Objects actualizados al cambiar la UI
2. Agregar esperas explícitas y assertions para evitar tests flaky
3. Utilizar los fixtures para datos de prueba
4. Verificar la autenticación antes de ejecutar tests
5. Mantener los console.logs solo en auth.setup.ts para guía del usuario