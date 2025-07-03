# 🔗 Backend - Finca Cheona API

Sistema backend robusto para el sistema de reservas de Finca Cheona, desarrollado con **FastAPI** y **MySQL**. Proporciona una API RESTful completa para la gestión de usuarios, autenticación JWT, reservas, alojamientos, mensajería en tiempo real y galería de imágenes.

## 🎯 Características Principales

- **API RESTful** con documentación automática (Swagger/OpenAPI)
- **Autenticación JWT** con tokens de acceso y refresh
- **Sistema de roles** (cliente/administrador) con permisos granulares
- **CRUD completo** para todas las entidades del sistema
- **Manejo de archivos** para galería de imágenes
- **Sistema de chat** en tiempo real entre usuarios y administradores
- **Cálculo dinámico** de precios y disponibilidad
- **Soft delete** para mantener integridad referencial
- **Middleware CORS** configurado para desarrollo y producción
- **Validación robusta** con Pydantic models

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

## 🛠️ Tecnologías y Dependencias

### Core Framework
- **FastAPI** - Framework web moderno y de alto rendimiento
- **Uvicorn** - Servidor ASGI para aplicaciones asíncronas
- **Pydantic** - Validación de datos y serialización

### Base de Datos
- **MySQL Connector Python** - Conexión nativa con MySQL
- **Pool de conexiones** - Gestión eficiente de conexiones DB

### Autenticación y Seguridad
- **python-jose** - Implementación completa de JWT
- **passlib + bcrypt** - Hashing seguro de contraseñas
- **python-multipart** - Manejo de formularios multipart

### Utilidades
- **python-dotenv** - Gestión de variables de entorno
- **Pillow** - Procesamiento y optimización de imágenes
- **CORS Middleware** - Configuración de políticas de origen cruzado

---

## 📁 Estructura del Proyecto

```
back_cheona_nuevo/
├── app/
│   ├── main.py                    # Punto de entrada FastAPI
│   ├── database/
│   │   ├── connection.py          # Configuración de conexión MySQL
│   │   └── models.py              # Modelos de base de datos (si aplica)
│   ├── models/                    # Modelos Pydantic para validación
│   │   ├── auth_model.py          # Modelos de autenticación
│   │   ├── user.py                # Modelos de usuario
│   │   ├── alojamiento_model.py   # Modelos de alojamientos
│   │   ├── reservation_model.py   # Modelos de reservas
│   │   ├── mensaje_models.py      # Modelos del sistema de chat
│   │   └── galeria_model.py       # Modelos de galería
│   ├── routes/                    # Endpoints de la API
│   │   ├── auth_routes.py         # Autenticación y login
│   │   ├── user.py                # Gestión de usuarios
│   │   ├── alojamiento_routes.py  # CRUD de alojamientos
│   │   ├── reservation_routes.py  # Gestión de reservas
│   │   ├── mensaje_routes.py      # Sistema de mensajería
│   │   └── galeria_routes.py      # Gestión de galería
│   ├── services/                  # Lógica de negocio
│   │   ├── auth_service.py        # Lógica de autenticación
│   │   ├── user_service.py        # Lógica de usuarios
│   │   ├── alojamiento_service.py # Lógica de alojamientos
│   │   ├── reservation_service.py # Lógica de reservas
│   │   ├── mensaje_service.py     # Lógica de mensajería
│   │   └── galeria_service.py     # Lógica de galería
│   ├── utils/                     # Utilidades
│   │   └── jwt_utils.py           # Utilidades JWT
│   └── static/                    # Archivos estáticos
│       └── alojamientos/          # Imágenes de alojamientos
├── uploads/                       # Archivos subidos
├── tests/                         # Tests unitarios
├── requirements.txt               # Dependencias Python
├── Dockerfile                     # Configuración Docker
├── start.sh                       # Script de inicio
├── wait-for-db.py                # Script de espera para MySQL
└── README.md                      # Documentación
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

## 🚀 Endpoints de la API

### 🔐 Autenticación
```http
POST /api/login                    # Login de usuario
```

### 👥 Gestión de Usuarios
```http
GET    /usuarios/?id={id}          # Obtener usuario por ID
GET    /usuarios/all               # Listar todos los usuarios (admin)
POST   /usuarios/                  # Crear nuevo usuario
PATCH  /usuarios/{id}              # Actualizar usuario
DELETE /usuarios/{id}              # Soft delete de usuario
```

### 🏠 Gestión de Alojamientos
```http
GET    /alojamientos/              # Listar todos los alojamientos
GET    /alojamientos/{id}          # Obtener alojamiento específico
POST   /alojamientos/              # Crear nuevo alojamiento
PUT    /alojamientos/{id}          # Actualizar alojamiento completo
PATCH  /alojamientos/{id}          # Actualizar alojamiento parcial
DELETE /alojamientos/{id}          # Eliminar alojamiento
```

### 📅 Sistema de Reservas
```http
POST   /reservas/                  # Crear nueva reserva
GET    /reservas/                  # Listar todas las reservas
GET    /reservas/usuario/{id}      # Reservas de un usuario específico
GET    /reservas/admin/full        # Reservas con datos de cliente (admin)
PATCH  /reservas/{id}              # Actualizar reserva
DELETE /reservas/{id}              # Cancelar reserva
POST   /reservas/{id}/confirmar-pago # Confirmar pago de reserva
GET    /reservas/disponibilidad    # Verificar disponibilidad
GET    /alojamientos/{id}/fechas-reservadas # Fechas ocupadas
```

### 💬 Sistema de Mensajería (Chat)
```http
POST   /chat/conversacion          # Crear nueva conversación
POST   /chat/mensaje               # Enviar mensaje
GET    /chat/conversaciones        # Listar conversaciones
GET    /chat/mensajes/{id}         # Obtener mensajes de conversación
POST   /chat/marcar_leidos/{id}    # Marcar mensajes como leídos
```

### 🖼️ Gestión de Galería
```http
POST   /galeria/upload-image       # Subir imagen a galería
GET    /galeria/images/{tipo}      # Obtener imágenes por tipo
```

### 📄 Documentación
```http
GET    /docs                       # Swagger UI (documentación interactiva)
GET    /redoc                      # ReDoc (documentación alternativa)
GET    /openapi.json               # Schema OpenAPI
```

---

## 📊 Modelos de Datos Principales

### 👤 Usuario (User)
```python
class User(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    password: str
    rol: str = "client"           # client | admin
    estado: str = "activo"        # activo | inactivo
```

### 🔐 Autenticación
```python
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class UserResponse(BaseModel):
    id_cliente: int
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    rol: str
```

### 🏠 Alojamiento
```python
class Alojamiento(BaseModel):
    id_alojamiento: int
    nombre: str
    descripcion: str
    capacidad_maxima: int
    capacidad_minima: int
    precio_noche: float
    servicios: str                # JSON string
    imagenes: str                 # URLs separadas por comas
    estado: str                   # disponible | no_disponible

class AlojamientoCreate(BaseModel):
    nombre: str
    descripcion: str
    capacidad_maxima: int
    capacidad_minima: int = 1
    precio_noche: float
    servicios: str
    imagenes: str = ""
```

### 📅 Reserva
```python
class ReservationCreate(BaseModel):
    id_alojamiento: int
    id_cliente: int
    fecha_inicio: str             # YYYY-MM-DD
    fecha_fin: str                # YYYY-MM-DD
    numero_huespedes: int
    precio_total: float
    estado_reserva: str = "pendiente"

class ReservationResponse(BaseModel):
    id_reserva: int
    id_alojamiento: int
    id_cliente: int
    fecha_inicio: str
    fecha_fin: str
    numero_huespedes: int
    precio_total: float
    estado_reserva: str           # pendiente | confirmada | cancelada
    fecha_creacion: str
```

### 💬 Mensajería
```python
class ConversacionCreate(BaseModel):
    id_usuario_cliente: int

class MensajeCreate(BaseModel):
    id_conversacion: int
    remitente: str                # client | admin
    mensaje: str
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

