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

## Estructura del Proyecto

```
├── tests/                    # Directorio de pruebas
├── test-results/            # Resultados de pruebas y capturas de pantalla
├── artifacts/               # Archivos generados durante las pruebas
├── playwright.config.ts     # Configuración de Playwright
└── package.json            # Dependencias y scripts
```

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