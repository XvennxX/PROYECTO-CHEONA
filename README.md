# 🏡 Finca Cheona - Sistema de Reservas

Sistema completo de reservas para Finca Cheona, desarrollado con **React** (frontend) y **FastAPI** (backend), utilizando **MySQL** como base de datos. Incluye gestión completa de alojamientos, reservas, usuarios, sistema de chat en tiempo real y panel administrativo avanzado.

## 🎯 Características Principales

- **Sistema de Reservas Completo**: Gestión de reservas con verificación de disponibilidad en tiempo real
- **Panel Administrativo**: Dashboard con estadísticas, gestión de reservas y usuarios
- **Sistema de Chat**: Comunicación en tiempo real entre clientes y administradores
- **Gestión de Alojamientos**: CRUD completo de espacios con galería de imágenes
- **Autenticación JWT**: Sistema seguro de autenticación con roles de usuario
- **Responsive Design**: Interfaz adaptativa para dispositivos móviles y desktop
- **API RESTful**: Backend robusto con documentación automática (Swagger)

## 🚀 Instalación Rápida

### Requisitos Previos
- [Docker Desktop](https://docs.docker.com/get-docker/) (incluye Docker Compose)
- [Git](https://git-scm.com/)

### 1. Clona el repositorio
```bash
git clone <url-del-repositorio>
cd PROYECTO-CHEONA
```

### 2. Ejecuta el setup automático

**En Windows:**
```batch
setup.bat
```

**En Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

> ⚠️ **Importante**: Usa siempre los scripts de setup. No ejecutes `docker-compose up` directamente, ya que primero necesitas configurar los archivos de entorno.

### Setup Manual (opcional)
Si prefieres configurar manualmente:

1. Crea los archivos de entorno:
```bash
cp .env.example .env
cp back_cheona_nuevo/.env.example back_cheona_nuevo/.env
cp front_nuevo/.env.example front_nuevo/.env
```

2. Inicia los contenedores:
```bash
docker-compose up --build -d
```

## 🔗 URLs de Acceso

- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Base de datos MySQL**: localhost:3307 (puerto externo)

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │   Backend       │
│   (React)       │                 │   (FastAPI)     │
│   Port: 3000    │                 │   Port: 8000    │
└─────────────────┘                 └─────────────────┘
                                            │
                                    Connection Pool
                                            ▼
                                    ┌─────────────────┐
                                    │   Database      │
                                    │   (MySQL)       │
                                    │   Port: 3307    │
                                    └─────────────────┘
```

## 👥 Usuarios de Prueba

### Administrador
- **Email**: admin@fincacheona.com
- **Contraseña**: admin123

### Cliente Demo
- **Email**: demo@ejemplo.com
- **Contraseña**: demo123

## 🏠 Alojamientos Disponibles

### 🏘️ Finca Completa
- **Capacidad**: 15 personas (mínimo 8)
- **Precio**: $90,000 COP/noche
- **Servicios**: Zona de fogata, piscina con jacuzzi, BBQ, 4 habitaciones
- **Ideal para**: Grupos grandes, celebraciones familiares

### 🏕️ Cabaña Miyacure
- **Capacidad**: 2 personas
- **Precio**: $300,000 COP/noche
- **Servicios**: Jacuzzi privado, balcón exterior, zona de cocina
- **Ideal para**: Parejas, escapadas románticas

### ⛺ Glamping Rústico
- **Capacidad**: 2 personas
- **Precio**: $250,000 COP/noche
- **Servicios**: Jacuzzi privado, experiencia camping de lujo
- **Ideal para**: Aventureros, contacto con la naturaleza

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

## 📱 Funcionalidades Implementadas

### Para Clientes
- ✅ **Registro y autenticación** con JWT
- ✅ **Explorar alojamientos** con filtros y búsqueda
- ✅ **Sistema de reservas** con verificación de disponibilidad
- ✅ **Gestión de perfil** (actualización de datos personales)
- ✅ **Chat en tiempo real** con administradores
- ✅ **Historial de reservas** con estados y detalles
- ✅ **Galería interactiva** de imágenes por tipo de alojamiento
- ✅ **Cálculo dinámico de precios** según fechas y ocupación

### Para Administradores
- ✅ **Panel de administración** con métricas y estadísticas
- ✅ **Gestión completa de reservas** (crear, actualizar, cancelar, confirmar pagos)
- ✅ **Gestión de alojamientos** (CRUD completo con imágenes)
- ✅ **Gestión de usuarios** con roles y estados
- ✅ **Sistema de chat** para comunicación con clientes
- ✅ **Reportes y análisis** (ingresos, ocupación, reservas por mes)
- ✅ **Galería de imágenes** por categorías (alojamientos, servicios, etc.)
- ✅ **Dashboard en tiempo real** con indicadores clave

### Características Técnicas
- 🔐 **Autenticación JWT** con refresh tokens
- 📊 **API RESTful** con documentación Swagger
- 🖼️ **Manejo de archivos** para galería de imágenes
- 💾 **Base de datos MySQL** con relaciones optimizadas
- 🐳 **Containerización Docker** para fácil despliegue
- 🔄 **Sistema de estados** para reservas y usuarios
- 📱 **Diseño responsive** con Tailwind CSS

## 🚨 Resolución de Problemas

### ❌ Error: "env file not found"
Si ves este error al ejecutar `docker-compose up`:
```
env file C:\...\back_cheona_nuevo\.env not found
```

**Solución**: Siempre usa el script de setup:
```bash
# En Windows
setup.bat

# En Linux/Mac
./setup.sh
```

O crea manualmente los archivoos `.env`:
```bash
cp .env.example .env
cp back_cheona_nuevo/.env.example back_cheona_nuevo/.env  
cp front_nuevo/.env.example front_nuevo/.env
```

### ❌ Error: "syntax error near unexpected token" en start.sh
Si ves errores como:
```
start.sh: line 6: syntax error near unexpected token `$'{\r''
start.sh: line 4: $'\r': command not found
```

**Causa**: Terminaciones de línea incorrectas (Windows CRLF vs Unix LF)

**Solución automática**: El proyecto incluye `.gitattributes` que debería prevenir esto.

**Solución manual en Windows**:
```powershell
# Convertir terminaciones de línea
cd back_cheona_nuevo
(Get-Content start.sh -Raw) -replace "`r`n", "`n" | Set-Content start.sh -NoNewline
```

**Solución manual en Linux/Mac**:
```bash
# Convertir terminaciones de línea
dos2unix back_cheona_nuevo/start.sh
# O usando sed
sed -i 's/\r$//' back_cheona_nuevo/start.sh
```

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

### ❌ Error 404 de Nginx en el Frontend
Si ves errores 404 al navegar entre páginas de React (como al acceder al dashboard de administrador):

**Causa**: Configuración de Nginx incorrecta para aplicaciones React con enrutamiento del lado del cliente.

**Solución implementada**: Se corrigió el archivo `nginx.conf` con:
```nginx
# Manejo correcto de rutas de React Router
try_files $uri $uri/ /index.html;
```

### ❌ Puerto 3306 de MySQL ocupado
Si ves errores como "port is already allocated":

**Causa**: Otra instancia de MySQL está usando el puerto 3306.

**Solución implementada**: 
- Cambiado el puerto externo de MySQL a 3307 en `docker-compose.yml`
- Actualizada la documentación para reflejar el cambio
- El puerto interno del contenedor sigue siendo 3306

```bash
# Verificar qué está usando el puerto 3306
netstat -an | findstr :3306

# Conectar a MySQL desde el host
mysql -h localhost -P 3307 -u cheona -p
```

## 🔧 Correcciones Recientes

### ✅ Configuración de Nginx Corregida
- Agregada configuración completa de Nginx para manejo de rutas de React
- Implementado `try_files` para evitar errores 404 en navegación SPA
- Agregadas cabeceras de seguridad y configuración de caché

### ✅ Puerto de MySQL Cambiado
- Puerto externo cambiado de 3306 a 3307 para evitar conflictos
- Archivos de entorno actualizados con documentación del cambio
- Verificado que el backend se conecta correctamente al puerto interno

### ✅ Dockerfile del Frontend Mejorado
- Agregada copia de `nginx.conf` al contenedor
- Optimizada configuración para servir archivos estáticos

## 📞 Soporte

Para problemas o consultas, contacta al equipo de desarrollo.

---
   
**Desarrollado con ❤️ para Finca Cheonaa**
