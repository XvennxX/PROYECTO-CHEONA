# 🎨 Frontend - Finca Cheona

Interface de usuario moderna y responsiva para el sistema de reservas de Finca Cheona, desarrollada con **React**, **TypeScript** y **Tailwind CSS**. Proporciona una experiencia completa tanto para clientes como para administradores.

## 🎯 Características Principales

- **Diseño Responsive** - Optimizado para desktop, tablet y móvil
- **Sistema de Reservas Interactivo** - Selección de fechas con verificación en tiempo real
- **Panel de Administración** - Dashboard completo con métricas y gestión
- **Chat en Tiempo Real** - Sistema de mensajería integrado
- **Galería Dinámica** - Visualización de imágenes por categorías
- **Autenticación Segura** - Login/registro con manejo de sesiones JWT
- **Navegación SPA** - Aplicación de página única con React Router
- **Componentes Reutilizables** - Arquitectura modular y escalable

## ✨ Características Implementadas

### Para Clientes (Users)
- 🏠 **Exploración de Alojamientos** - Catálogo completo con filtros y búsqueda
- 📅 **Sistema de Reservas** - Selección de fechas con calendario interactivo
- ✅ **Verificación de Disponibilidad** - Consulta en tiempo real de fechas ocupadas
- 🖼️ **Galería Interactiva** - Visualización de imágenes por tipo de alojamiento
- 👤 **Gestión de Perfil** - Actualización de datos personales y preferencias
- 📞 **Formulario de Contacto** - Comunicación directa con la administración
- 📱 **Diseño Responsive** - Experiencia optimizada en todos los dispositivos
- 💬 **Chat con Administradores** - Mensajería en tiempo real
- 📋 **Historial de Reservas** - Seguimiento completo de reservas pasadas y futuras

### Para Administradores (Admin)
- 📊 **Dashboard Ejecutivo** - Métricas clave y indicadores de rendimiento
- 🏠 **Gestión de Alojamientos** - CRUD completo con carga de imágenes
- 📅 **Gestión de Reservas** - Control total del sistema de reservas
- 👥 **Administración de Usuarios** - Gestión de clientes y roles
- 💬 **Sistema de Chat** - Comunicación con todos los clientes
- 📈 **Reportes Avanzados** - Análisis de ingresos, ocupación y tendencias
- 🖼️ **Gestión de Galería** - Organización de imágenes por categorías
- ⚙️ **Configuración** - Parámetros del sistema y preferencias

### Características Técnicas
- ⚡ **Lazy Loading** - Carga optimizada de componentes
- 🔄 **Estado Global** - Context API para autenticación
- 🎨 **Tailwind CSS** - Framework CSS utilitario
- 📱 **PWA Ready** - Preparado para aplicación web progresiva
- 🔒 **Rutas Protegidas** - Control de acceso por roles
- 🌐 **Internacionalización** - Estructura preparada para múltiples idiomas

## 🛠️ Stack Tecnológico

### Core Framework
- **React 18** - Biblioteca de interfaces de usuario
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Build tool rápido y moderno

### Enrutamiento y Estado
- **React Router** - Navegación y enrutamiento SPA
- **Context API** - Gestión de estado global para autenticación

### Styling y UI
- **Tailwind CSS** - Framework CSS utilitario
- **Lucide React** - Biblioteca de iconos moderna
- **React DatePicker** - Selector de fechas interactivo

### Comunicación
- **Axios** - Cliente HTTP para peticiones a la API
- **Servicios Customizados** - Abstracción de la lógica de API

### Optimización
- **Lazy Loading** - Carga dinámica de componentes
- **Code Splitting** - División automática del código
- **Tree Shaking** - Eliminación de código no utilizado

## 📁 Estructura del Proyecto

```
front_nuevo/
├── public/
│   ├── favicon.svg               # Icono de la aplicación
│   └── index.html                # HTML base
├── src/
│   ├── App.jsx                   # Componente principal con routing
│   ├── main.jsx                  # Punto de entrada de React
│   ├── index.css                 # Estilos globales y variables CSS
│   ├── types.js                  # Definiciones de tipos globales
│   ├── components/               # Componentes reutilizables
│   │   ├── auth/                 # Autenticación y contexto
│   │   │   └── AuthContext.jsx   # Context para manejo de sesión
│   │   ├── home/                 # Componentes de página principal
│   │   │   ├── Hero.jsx          # Sección hero principal
│   │   │   ├── Services.jsx      # Servicios disponibles
│   │   │   └── Features.jsx      # Características destacadas
│   │   ├── layout/               # Componentes de estructura
│   │   │   ├── Layout.jsx        # Layout principal
│   │   │   ├── Header.jsx        # Barra de navegación
│   │   │   └── Footer.jsx        # Pie de página
│   │   ├── reservation/          # Componentes de reservas
│   │   │   ├── ReservationForm.jsx # Formulario de reserva
│   │   │   └── DatePicker.jsx    # Selector de fechas
│   │   ├── admin/                # Componentes administrativos
│   │   │   ├── Dashboard.jsx     # Panel de administración
│   │   │   └── AdminLayout.jsx   # Layout para admin
│   │   ├── ui/                   # Componentes UI genéricos
│   │   │   ├── Button.jsx        # Botón reutilizable
│   │   │   ├── Card.jsx          # Tarjeta genérica
│   │   │   └── Modal.jsx         # Modal reutilizable
│   │   └── utils/                # Utilidades y helpers
│   ├── pages/                    # Páginas principales
│   │   ├── Home.jsx              # Página de inicio
│   │   ├── Rooms.jsx             # Catálogo de alojamientos
│   │   ├── RoomDetail.jsx        # Detalle de alojamiento
│   │   ├── Reservation.jsx       # Página de reservas
│   │   ├── Gallery.jsx           # Galería de imágenes
│   │   ├── Contact.jsx           # Página de contacto
│   │   ├── NotFound.jsx          # Página 404
│   │   ├── user/                 # Páginas de usuario
│   │   │   ├── Profile.jsx       # Perfil del usuario
│   │   │   ├── MyReservations.jsx # Historial de reservas
│   │   │   └── Settings.jsx      # Configuración
│   │   └── admin/                # Páginas administrativas
│   │       ├── Dashboard.jsx     # Dashboard principal
│   │       ├── EditSpace.jsx     # Edición de alojamientos
│   │       └── CrearAlojamiento.jsx # Crear nuevo alojamiento
│   ├── services/                 # Servicios de API
│   │   ├── api.js                # Cliente HTTP base
│   │   ├── reservationService.js # Servicio de reservas
│   │   ├── userService.js        # Servicio de usuarios
│   │   ├── chatService.js        # Servicio de mensajería
│   │   └── galeriaService.js     # Servicio de galería
│   └── mocks/                    # Datos de desarrollo
│       └── data.js               # Datos mock para testing
├── package.json                  # Dependencias y scripts
├── vite.config.js               # Configuración de Vite
├── tailwind.config.js           # Configuración de Tailwind
├── postcss.config.js            # Configuración de PostCSS
├── eslint.config.js             # Configuración de ESLint
├── Dockerfile                   # Configuración Docker
├── nginx.conf                   # Configuración Nginx para producción
└── README.md                    # Documentación
```

## Instalación y configuración

### Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para la instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/finca-reservas.git
   cd finca-reservas
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```
   npm run dev
   ```

4. Abre el navegador en `http://localhost:5173`

## Configuración para producción

Para compilar el proyecto para producción:

```
npm run build
```

Los archivos compilados se encontrarán en el directorio `dist/`.

## Conexión con backend

Este frontend está diseñado para conectarse a un backend desarrollado en Python (Flask o Django) con una base de datos MySQL. 

### Configuración de la API

La comunicación con el backend se realiza a través de los servicios definidos en `src/services/`. Para conectar con tu backend:

1. Modifica la URL base en `src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://tu-backend-url.com/api';
   ```

2. Implementa los endpoints correspondientes en tu backend según los servicios definidos:
   - `/api/rooms` - Información de habitaciones
   - `/api/availability` - Comprobar disponibilidad
   - `/api/reservations` - Gestionar reservas
   - `/api/contact` - Formulario de contacto

### Ejemplo de integración con Flask

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    # Lógica para obtener habitaciones de la base de datos
    return jsonify({"data": rooms, "status": 200, "message": "OK"})

@app.route('/api/availability', methods=['POST'])
def check_availability():
    data = request.json
    # Lógica para verificar disponibilidad en las fechas seleccionadas
    return jsonify({"data": is_available, "status": 200, "message": "OK"})

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.json
    # Lógica para crear una reserva en la base de datos
    return jsonify({"data": new_reservation, "status": 200, "message": "Reserva creada exitosamente"})

if __name__ == '__main__':
    app.run(debug=True)
```

## Personalización

### Colores y estilos

Los colores y estilos principales se definen en `src/index.css` y `tailwind.config.js`. Para personalizar:

1. Modifica las variables CSS en `src/index.css`:
   ```css
   :root {
     --color-primary: 45, 106, 79; /* Cambia estos valores para el color primario */
     --color-secondary: 139, 94, 52; /* Color secundario */
     ...
   }
   ```

2. Actualiza la configuración de Tailwind en `tailwind.config.js` si necesitas añadir más personalizaciones.

### Imágenes y contenido

- Sustituye las URLs de imágenes en `src/mocks/data.ts` por tus propias imágenes.
- Actualiza textos y descripciones según las necesidades de tu finca.

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

## Contacto

Para cualquier consulta o soporte, contacta a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com).