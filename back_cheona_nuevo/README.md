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
- [Requisitos Funcionales](#requisitos-funcionales)
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

### Requerimientos del Proyecto

El archivo `requirements.txt` incluye:

```
fastapi==0.95.0
uvicorn==0.21.1
pydantic==1.10.7
mysql-connector-python==8.0.32
python-jose==3.3.0
passlib==1.7.4
python-multipart==0.0.6
bcrypt==4.0.1
python-dotenv==1.0.0
Pillow==9.5.0
```

Estos paquetes son necesarios para:
- **fastapi**: Framework principal para construir la API
- **uvicorn**: Servidor ASGI para ejecutar la aplicación
- **pydantic**: Validación de datos y serialización
- **mysql-connector-python**: Conexión con la base de datos MySQL
- **python-jose**: Implementación de JWT para autenticación
- **passlib**: Manejo seguro de contraseñas
- **python-multipart**: Manejo de datos en formularios
- **bcrypt**: Algoritmo de hash para contraseñas
- **python-dotenv**: Manejo de variables de entorno
- **Pillow**: Procesamiento de imágenes

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

### Desarrollo

```bash
uvicorn app.main:app --reload
```

### Producción

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

La API estará disponible en: [http://localhost:8000](http://localhost:8000)

La documentación de la API estará disponible en:
- [http://localhost:8000/docs](http://localhost:8000/docs) - Swagger UI
- [http://localhost:8000/redoc](http://localhost:8000/redoc) - ReDoc

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

## Requisitos Funcionales

La siguiente tabla muestra los requisitos funcionales del sistema y su clasificación por tipo:

| FUNCIONALIDAD | TIPO |
|---------------|------|
| RF01 - Notificaciones | esencial |
| RF02 - Registro de clientes | esencial |
| RF03 - Inicio de sesión para clientes | esencial |
| RF04 - Actualización de datos del cliente | esencial |
| RF05 - Funcionalidad de hacer reserva para el cliente | esencial |
| RF06 - Funcionalidad de gestión de reserva para el cliente | esencial |
| RF07 - Funcionalidad de valoración de la reserva para el cliente | opcional |
| RF08 - Planes y servicios adicionales | esencial |
| RF09 - Galería y navegación por imágenes | esencial |
| RF10 - Pestaña de información de contacto | esencial |
| RF11 - Mapa interactivo de geolocalización | ideal |
| RF12 - Integración con redes sociales | ideal |
| RF13 - Widget flotante de WhatsApp | esencial |
| RF14 - Inicio de sesión para funcionarios | esencial |
| RF15 - Módulo de gestión de reserva para funcionario | esencial |
| RF16 - Funcionalidad de creación, actualización y búsqueda de clientes por funcionario | esencial |
| RF17 - Módulo de creación de agenda para funcionario | esencial |
| RF18 - Módulo de creación de funcionario, para administrador | esencial |
| RF19 - Módulo de parametrización de planes y servicios adicionales | esencial |
| RF20 - Panel de administrador centralizado | esencial |
| RF21 - Autenticación con JWT y control por rol | esencial |
| RF22 - Sistema de mensajería interna (chat) | ideal |
| RF23 - Cálculo dinámico de precios en reservas | esencial |

---

## Notas de Seguridad

- Las contraseñas se almacenan usando SHA256.
- Para producción, se recomienda usar JWT para autenticación y HTTPS.
- No expongas el endpoint `/usuarios/` sin autenticación en producción.

---

## Licencia

Este proyecto está bajo la licencia MIT...

---

## Contacto

Para soporte o dudas, contacta a [svenns109@gmial.com](mailto:svenns109@gmial.com).

