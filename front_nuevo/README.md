# Finca Los Olivos - Sistema de Reservas

Este proyecto es un sistema de reservas para una finca rural, desarrollado con React y TypeScript. Proporciona una interfaz moderna y responsiva para que los usuarios puedan ver las habitaciones disponibles, hacer reservas y contactar con los propietarios.

## Características principales

- Visualización de habitaciones y cabañas disponibles
- Sistema de reservas con selección de fechas
- Verificación de disponibilidad en tiempo real
- Galería de imágenes
- Información sobre servicios y actividades
- Formulario de contacto
- Diseño completamente responsivo

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- Tailwind CSS
- Lucide React (iconos)
- Axios (para peticiones HTTP)
- React DatePicker

## Estructura del proyecto

El proyecto sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:

```
src/
├── components/       # Componentes reutilizables
│   ├── home/         # Componentes específicos para la página de inicio
│   ├── layout/       # Componentes de estructura (Header, Footer)
│   ├── reservation/  # Componentes relacionados con las reservas
│   └── ui/           # Componentes UI genéricos
├── mocks/            # Datos mock para desarrollo
├── pages/            # Páginas principales de la aplicación
├── services/         # Servicios para API y lógica de negocio
├── types/            # Definiciones de tipos TypeScript
└── utils/            # Utilidades y funciones auxiliares
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