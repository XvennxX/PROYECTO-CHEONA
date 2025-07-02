# 🏡 Finca Cheona - Sistema de Reservas

Sistema completo de reservas para Finca Cheona, desarrollado con **React** (frontend) y **FastAPI** (backend), utilizando **MySQL** como base de datos.

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

### 3. Accede a la aplicación
- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Base de datos MySQL**: localhost:3307 (puerto externo cambiado para evitar conflictos)

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
