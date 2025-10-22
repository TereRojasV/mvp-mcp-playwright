# Prueba de Concepto - Pruebas E2E para MCP

Este repositorio contiene una Prueba de Concepto (PoC) para la implementación de pruebas automatizadas End-to-End (E2E) para el proyecto MCP.

## Descripción

El objetivo de este proyecto es evaluar y demostrar la viabilidad de un framework de pruebas automatizadas para validar los flujos principales de la aplicación MCP de principio a fin, simulando las interacciones de un usuario real.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de continuar:

-   [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
-   [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO_GIT>
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd poc-mcp-e2e
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

## Ejecución de Pruebas

Para ejecutar el conjunto de pruebas E2E, utiliza el siguiente comando:

```bash
npm test
```

*Nota: Revisa el archivo `package.json` para ver otros scripts disponibles que puedan ejecutar pruebas en diferentes modos (por ejemplo, con UI, en modo headless, etc.).*

## Estructura del Proyecto

```
poc-mcp-e2e/
├── tests/                # Contiene los archivos de especificaciones de prueba
├── page-objects/         # (Opcional) Abstracciones de las páginas de la aplicación
├── fixtures/             # (Opcional) Datos de prueba o estados iniciales
├── support/              # (Opcional) Comandos personalizados y configuraciones de soporte
├── package.json          # Dependencias y scripts del proyecto
└── README.md             # Este archivo
```