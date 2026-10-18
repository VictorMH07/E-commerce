# NovaShop — Backend

Backend de NovaShop, una tienda virtual desarrollada con Python y FastAPI. Expone una API REST para consultar productos almacenados en una base de datos PostgreSQL.

## Tecnologías utilizadas

- Python 3.13 o superior.
- FastAPI.
- Uvicorn.
- SQLAlchemy.
- Psycopg.
- Pydantic Settings.
- PostgreSQL.
- uv para la gestión de dependencias y del entorno virtual.

## Requisitos previos

Antes de ejecutar el backend, necesitas:

- Python 3.13 o una versión compatible con `pyproject.toml`.
- PostgreSQL instalado y ejecutándose.
- uv instalado.
- El repositorio de NovaShop descargado en tu equipo.

## Estructura del backend

```text
backend/
├── src/
│   └── app/
│       ├── models/
│       │   └── product.py
│       ├── routers/
│       │   └── products.py
│       ├── schemas/
│       │   └── product.py
│       ├── database.py
│       └── main.py
├── .env
├── .gitignore
├── .python-version
├── pyproject.toml
├── uv.lock
└── README.md
```

- `main.py`: configura la aplicación FastAPI y sus rutas.
- `database.py`: configura la conexión con PostgreSQL y las sesiones de SQLAlchemy.
- `models/`: contiene los modelos de la base de datos.
- `schemas/`: define los esquemas utilizados para validar y representar los datos de la API.
- `routers/`: contiene las rutas de los recursos de la API.
- `.env`: almacena la configuración local de conexión a la base de datos.
- `pyproject.toml`: define las dependencias y la configuración del proyecto.
- `uv.lock`: registra las versiones resueltas de las dependencias.

## Configuración de PostgreSQL

NovaShop utiliza PostgreSQL como sistema de gestión de bases de datos.

La configuración actual utiliza estos valores predeterminados:

| Parámetro | Valor |
|---|---|
| Host | `localhost` |
| Puerto | `5432` |
| Base de datos | `novashop` |
| Usuario | `novashop_user` |
| Contraseña | La definida localmente |

La base de datos y el usuario deben existir en PostgreSQL, y el usuario debe tener los permisos necesarios.

### Variables de entorno

Dentro de la carpeta `backend`, crea o utiliza el archivo `.env` con esta estructura:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=novashop
DB_USER=novashop_user
DB_PASSWORD=tu_contraseña_local
```

Reemplaza `tu_contraseña_local` por la contraseña configurada en tu PostgreSQL.

**Seguridad:** el archivo `.env` está destinado a la configuración local. No lo publiques en GitHub ni compartas sus credenciales. El repositorio debe contener únicamente instrucciones de configuración, nunca contraseñas reales.

## Instalación de dependencias

Desde la raíz del repositorio, ejecuta:

```bash
cd backend
uv sync
```

Este comando crea o actualiza el entorno virtual e instala las dependencias definidas en `pyproject.toml` y `uv.lock`.

## Ejecutar el backend

Desde la carpeta `backend`, ejecuta:

```bash
uv run uvicorn app.main:app --app-dir src --reload
```

La API estará disponible en:

- API: http://127.0.0.1:8000/
- Documentación interactiva: http://127.0.0.1:8000/docs
- Documentación alternativa: http://127.0.0.1:8000/redoc

Para consultar los productos, utiliza:

http://127.0.0.1:8000/products/

El servidor se reinicia automáticamente al detectar cambios en el código mientras está activo el modo de desarrollo.

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/products/` | Consulta la lista de productos. |
| `GET` | `/products/{id}/` | Consulta un producto por su identificador. |

La disponibilidad y el comportamiento de cada endpoint se pueden verificar en la documentación interactiva de FastAPI.

## Integración con Angular

El frontend se configura para comunicarse con el backend mediante la URL:

`http://127.0.0.1:8000`

La configuración del frontend se encuentra en:

`E_frontend/src/environments/environment.ts`

Para utilizar NovaShop localmente, ejecuta el backend y el frontend en terminales separadas.

## Solución de problemas

- **Error de conexión con PostgreSQL:** comprueba que el servidor esté activo, que la base de datos exista y que las variables de entorno sean correctas.
- **Error de autenticación:** verifica el usuario y la contraseña configurados localmente.
- **Error al instalar dependencias:** comprueba que uv esté instalado y que estés ejecutando los comandos desde la carpeta `backend`.
- **No se muestran los productos en Angular:** verifica que FastAPI esté ejecutándose y que la URL de la API sea correcta.
- **Error de CORS:** comprueba que la configuración del backend permita el origen local utilizado por Angular, normalmente `http://localhost:4200`.

## Documentación relacionada

- [Documentación general de NovaShop](../README.md)
- [Documentación del frontend](../E_frontend/README.md)
- [Documentación oficial de FastAPI](https://fastapi.tiangolo.com/)
- [Documentación oficial de SQLAlchemy](https://docs.sqlalchemy.org/)
- [Documentación oficial de PostgreSQL](https://www.postgresql.org/docs/)