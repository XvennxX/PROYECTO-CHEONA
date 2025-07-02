#!/bin/bash

echo ""
echo "==================================="
echo "🏕️  FINCA CHEONA - SETUP"
echo "==================================="
echo ""

# Verificar que Docker esté ejecutándose
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está ejecutándose."
    echo "   Por favor inicia Docker y vuelve a ejecutar este script."
    exit 1
fi

echo "✅ Docker está ejecutándose"
echo ""

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "📄 Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
else
    echo "📄 Archivo .env ya existe"
fi
echo ""

echo "🔨 Construyendo e iniciando contenedores..."
docker-compose down --remove-orphans
docker-compose up --build -d

echo ""
echo "⏳ Esperando que los servicios estén listos..."
sleep 15

echo ""
echo "✅ ¡Finca Cheona está lista!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "👥 Usuarios de prueba:"
echo "   Admin:   admin@fincacheona.com / admin123"
echo "   Cliente: demo@ejemplo.com / demo123"
echo ""
echo "Presiona Ctrl+C para detener los logs..."
echo ""

docker-compose logs -f