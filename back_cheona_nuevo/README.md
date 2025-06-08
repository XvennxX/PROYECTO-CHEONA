# Backend - Finca Cheona

Este proyecto es el backend para el sistema de reservas de Finca Cheona, desarrollado con **FastAPI** y **MySQL**. Proporciona una API RESTful para la gestión de usuarios, autenticación y operaciones básicas relacionadas con clientes.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Endpoints Principales](#endpoints-principales)
- [Modelos de Datos](#modelos-de-datos)
- [Notas de Seguridad](#notas-de-seguridad)
- [Licencia](#licencia)

---

## Características

- API REST para gestión de usuarios (CRUD)
- Autenticación de usuarios (login)
- Hash de contraseñas seguro (SHA256)
- Conexión a base de datos MySQL
- Separación por módulos (servicios, rutas, modelos)
- Middleware CORS habilitado para desarrollo

---

## Tecnologías

- **Python 3.9+**
- **FastAPI**
- **MySQL Connector Python**
- **Pydantic**
- **Uvicorn**
- **python-jose** (para futuras implementaciones de JWT)

---

## Estructura del Proyecto

```
back_cheona_nuevo/
├── app/
│   ├── database/           # Conexión a la base de datos
│   │   └── connection.py
│   ├── models/             # Modelos Pydantic
│   │   ├── auth_model.py
│   │   └── user.py
│   ├── routes/             # Rutas de la API
│   │   ├── auth_routes.py
│   │   └── user.py
│   ├── services/           # Lógica de negocio
│   │   ├── auth_service.py
│   │   └── user_service.py
│   ├── utils/              # Utilidades (helpers)
│   └── main.py             # Punto de entrada FastAPI
├── requirements.txt
└── README.md
```

---

## Instalación y Configuración

### Requisitos Previos

- Python 3.9 o superior
- MySQL Server en ejecución

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/finca-cheona-backend.git
   cd back_cheona_nuevo
   ```

2. **Crea y activa un entorno virtual:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configura la base de datos MySQL:**
   - Crea la base de datos `finca_cheona` y la tabla `cliente` con los campos requeridos.
   - Ajusta los parámetros de conexión en `app/database/connection.py` si es necesario.

---

## Variables de Entorno

Actualmente la configuración de la base de datos está en el archivo `connection.py`. Para producción, se recomienda usar variables de entorno o un archivo `.env`.

---

## Ejecución del Proyecto

```bash
uvicorn app.main:app --reload
```

La API estará disponible en: [http://localhost:8000](http://localhost:8000)

---

## Endpoints Principales

### Usuarios

- `GET /usuarios/?id={id}`  
  Obtener usuario por ID.

- `POST /usuarios/`  
  Crear usuario nuevo.

- `PATCH /usuarios/{id}`  
  Actualizar usuario existente.

- `DELETE /usuarios/{id}`  
  Eliminar usuario.

### Autenticación

- `POST /api/login`  
  Login de usuario (requiere email y password).

---

## Modelos de Datos

### User

```python
class User(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    password: str
```

### LoginRequest

```python
class LoginRequest(BaseModel):
    email: str
    password: str
```

### UserResponse

```python
class UserResponse(BaseModel):
    nombre: str
    email: str
    rol: str
```

---

## Notas de Seguridad

- Las contraseñas se almacenan usando SHA256.
- Para producción, se recomienda usar JWT para autenticación y HTTPS.
- No expongas el endpoint `/usuarios/` sin autenticación en producción.

---

## Licencia

Este proyecto está bajo la licencia MIT.

---

## Contacto

Para soporte o dudas, contacta a [svenns109@gmial.com](mailto:svenns109@gmial.com).

