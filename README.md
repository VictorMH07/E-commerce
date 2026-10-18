# NovaShop — Tienda virtual

NovaShop es un proyecto personal de desarrollo web cuyo objetivo es construir una tienda virtual funcional, con una interfaz intuitiva y una arquitectura que integra un frontend, un backend y una base de datos. Su desarrollo permite poner en práctica y ampliar conocimientos en tecnologías web, gestión de datos y desarrollo de software.

## Tecnologías utilizadas

### Frontend
- Angular 20
- TypeScript
- HTML y CSS
- Bootstrap y Bootstrap Icons

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL

### Herramientas
- Git y GitHub
- Visual Studio Code
- Node.js y npm
- uv para la gestión de dependencias de Python

## Funcionalidades

- Visualización del catálogo de productos.
- Búsqueda de productos.
- Filtrado por categorías y ordenamiento por precio.
- Visualización del detalle de cada producto.
- Gestión del carrito de compras.
- Gestión de productos favoritos.
- Registro e inicio de sesión.
- Proceso de checkout.
- Consulta del historial y detalle de pedidos.

## Arquitectura del proyecto

NovaShop está dividido en dos aplicaciones principales:

- **Frontend:** desarrollado con Angular. Presenta la interfaz y permite interactuar con la tienda.
- **Backend:** desarrollado con FastAPI. Expone una API REST para consultar productos almacenados en PostgreSQL.

El frontend se comunica con el backend mediante solicitudes HTTP.

## Estructura del repositorio

```text
E-commerce/
├── E_frontend/   # Aplicación Angular
├── backend/      # API desarrollada con FastAPI
└── README.md     # Documentación general
```

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- Python 3.13 o superior.
- uv.
- PostgreSQL.
- Git.

## Ejecución del proyecto

El frontend y el backend se ejecutan por separado. Consulta sus respectivas guías para instalar las dependencias, configurar la base de datos y ejecutar las aplicaciones:

- [Documentación del frontend](E_frontend/README.md)
- [Documentación del backend](backend/README.md)

## Configuración y seguridad

Las credenciales de PostgreSQL se configuran localmente en `backend/.env`, siguiendo las instrucciones de la documentación del backend.

**No publiques archivos `.env`, contraseñas ni otras credenciales en GitHub.**

## Estado del proyecto

El frontend Angular está integrado con la API desarrollada en FastAPI. Se han comprobado las principales funcionalidades de la tienda, incluyendo el catálogo, los filtros, el carrito, los favoritos y los pedidos.

El proyecto continuará evolucionando mediante nuevas funcionalidades, mejoras en las pruebas y optimizaciones de la experiencia de usuario.