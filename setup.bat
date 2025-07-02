@echo off
echo.
echo ===================================
echo 🏕️  FINCA CHEONA - SETUP
echo ===================================
echo.

REM Verificar que Docker Desktop esté corriendo
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Desktop no está ejecutándose.
    echo    Por favor inicia Docker Desktop y vuelve a ejecutar este script.
    pause
    exit /b 1
)

echo ✅ Docker Desktop está ejecutándose
echo.

REM Crear archivo .env si no existe
if not exist ".env" (
    echo 📄 Creando archivo .env desde .env.example...
    copy .env.example .env >nul
    echo ✅ Archivo .env creado
) else (
    echo 📄 Archivo .env ya existe
)

REM Crear archivo .env para el backend si no existe
if not exist "back_cheona_nuevo\.env" (
    echo 📄 Creando archivo .env para el backend...
    copy back_cheona_nuevo\.env.example back_cheona_nuevo\.env >nul
    echo ✅ Archivo .env del backend creado
) else (
    echo 📄 Archivo .env del backend ya existe
)

REM Crear archivo .env para el frontend si no existe
if not exist "front_nuevo\.env" (
    echo 📄 Creando archivo .env para el frontend...
    copy front_nuevo\.env.example front_nuevo\.env >nul
    echo ✅ Archivo .env del frontend creado
) else (
    echo 📄 Archivo .env del frontend ya existe
)
echo.

echo 🔨 Construyendo e iniciando contenedores...
docker-compose down --remove-orphans
docker-compose up --build -d

echo.
echo ⏳ Esperando que los servicios estén listos...
timeout /t 15 /nobreak >nul

echo.
echo ✅ ¡Finca Cheona está lista!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo 👥 Usuarios de prueba:
echo    Admin:   admin@fincacheona.com / admin123
echo    Cliente: demo@ejemplo.com / demo123
echo.
echo Presiona cualquier tecla para ver los logs...
pause >nul

docker-compose logs -f