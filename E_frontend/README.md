# NovaShop — Frontend

Frontend de NovaShop, una tienda virtual desarrollada con Angular 20. La aplicación permite explorar productos, buscar artículos, filtrar por categorías y gestionar el proceso de compra.

## Tecnologías utilizadas

- Angular 20
- TypeScript
- HTML y CSS
- Bootstrap
- Bootstrap Icons

## Requisitos previos

Antes de ejecutar el frontend, necesitas tener instalado:

- Node.js y npm.
- Git, para clonar el repositorio si es necesario.
- El backend de NovaShop ejecutándose para consultar los productos desde la API.

## Instalación

Desde la carpeta `E_frontend`, ejecuta:

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

## Configuración de la API

La URL del backend se configura en:

`src/environments/environment.ts`

La configuración local actual utiliza:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000'
};
```

El backend debe estar disponible en esa dirección para que el frontend pueda consultar los productos.

## Ejecutar en desarrollo

Desde la carpeta `E_frontend`, ejecuta:

```bash
ng serve
```

Si Angular CLI no está disponible globalmente, utiliza:

```bash
npx ng serve
```

Abre en el navegador:

http://localhost:4200/

La aplicación se actualizará automáticamente al guardar cambios en los archivos fuente.

## Compilar el proyecto

Para compilar la aplicación, ejecuta:

```bash
ng build
```

Los archivos generados se almacenan en la carpeta `dist/`.

## Funcionalidades principales

- Catálogo de productos.
- Búsqueda, filtrado y ordenamiento.
- Detalle de productos.
- Carrito de compras.
- Productos favoritos.
- Registro e inicio de sesión.
- Checkout e historial de pedidos.
- Comunicación con la API mediante solicitudes HTTP.

## Estructura general

```text
src/
├── app/
│   ├── pages/
│   └── shared/
│       ├── components/
│       ├── interfaces/
│       └── services/
├── environments/
└── main.ts

public/
└── images/
    ├── banners/
    ├── categories/
    └── products/
```

La estructura puede variar a medida que el proyecto evolucione.

## Pruebas

Para ejecutar las pruebas unitarias configuradas en Angular, utiliza:

```bash
ng test
```

Este comando requiere que las dependencias y la configuración de pruebas del proyecto estén disponibles.

## Documentación relacionada

- [Documentación general de NovaShop](../README.md)
- [Documentación del backend](../backend/README.md)
- [Documentación oficial de Angular](https://angular.dev/)