# 🏡 Finca Cheona - Sistema de Reservas

Sistema completo de reservas para Finca Cheona, desarrollado con **React** (frontend) y **FastAPI** (backend), utilizando **MySQL** como base de datos.

## 🚀 Instalación Rápida

### Requisitos Previos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### 1. Clona el repositorio
```bash
git clone <url-del-repositorio>
cd PROYECTO-CHEONA
```

### 2. Ejecuta el proyecto
```bash
docker-compose up --build
```

### 3. Accede a la aplicación
- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Base de datos MySQL**: localhost:3306

## 👥 Usuarios de Prueba

### Administrador
- **Email**: admin@fincacheona.com
- **Contraseña**: admin123

### Cliente Demo
- **Email**: demo@ejemplo.com
- **Contraseña**: demo123

## 🏠 Alojamientos Disponibles

1. **Finca completa** (15 personas) - $90,000/noche
   - Zona de fogata, piscina con jacuzzi, BBQ, 4 habitaciones
   - Mínimo 8 personas

2. **Cabaña Miyacure** (2 personas) - $300,000/noche
   - Jacuzzi privado, balcón exterior, zona de cocina

3. **Glamping Rústico** (2 personas) - $250,000/noche
   - Jacuzzi privado, experiencia camping de lujo

## 📁 Estructura del Proyecto

```
PROYECTO-CHEONA/
├── back_cheona_nuevo/         # Backend (FastAPI + Python)
│   ├── app/
│   │   ├── main.py           # Punto de entrada
│   │   ├── database/         # Configuración BD
│   │   ├── models/           # Modelos Pydantic
│   │   ├── routes/           # Endpoints API
│   │   ├── services/         # Lógica de negocio
│   │   └── utils/            # Utilidades
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env                  # Variables de entorno
├── front_nuevo/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Servicios API
│   │   └── utils/            # Utilidades
│   ├── Dockerfile
│   └── package.json
├── database/
│   └── init.sql             # Script de inicialización BD
├── uploads/                 # Archivos subidos
├── docker-compose.yml       # Configuración Docker
└── README.md
```

## 🛠️ Desarrollo Local (Sin Docker)

### Backend (FastAPI)
```bash
cd back_cheona_nuevo
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React)
```bash
cd front_nuevo
npm install
npm run dev
```

### Base de Datos
Ejecutar el script `database/init.sql` en tu instancia local de MySQL.

## 🐳 Comandos Docker Útiles

```bash
# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Limpiar volúmenes (eliminar datos BD)
docker-compose down -v
```

## 🔧 Configuración de Entorno

El archivo `.env` en `back_cheona_nuevo/` contiene:
```env
DB_HOST=db
DB_PORT=3306
DB_USER=cheona
DB_PASSWORD=cheona123
DB_NAME=finca_cheona
SECRET_KEY=finca_cheona_secret_key_2025_muy_segura
```

## 📱 Funcionalidades

### Para Clientes
- ✅ Registro y autenticación
- ✅ Explorar alojamientos
- ✅ Realizar reservas
- ✅ Gestionar perfil
- ✅ Chat con administradores
- ✅ Ver historial de reservas

### Para Administradores
- ✅ Panel de administración
- ✅ Gestión de reservas
- ✅ Gestión de alojamientos
- ✅ Chat con clientes
- ✅ Reportes y estadísticas

## 🚨 Resolución de Problemas

### Error de conexión a la base de datos
El backend ahora incluye un sistema de espera automática para MySQL:
```bash
# Si persisten problemas, reiniciar contenedores
docker-compose down
docker-compose up --build
```

### Puerto en uso
```bash
# Cambiar puertos en docker-compose.yml si es necesario
ports:
  - "8001:8000"  # Backend
  - "3001:80"    # Frontend
```

### Problemas con volúmenes
```bash
# Limpiar volúmenes y reconstruir
docker-compose down -v
docker-compose up --build
```

### Verificar estado de los servicios
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Ver logs solo de la base de datos
docker-compose logs -f db
```

## 📞 Soporte

Para problemas o consultas, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Finca Cheona**
