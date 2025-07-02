# Dockerfile para el backend (FastAPI)
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    bash \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Crear directorio para uploads
RUN mkdir -p /app/uploads

# Hacer el script ejecutable
RUN chmod +x start.sh

EXPOSE 8000

# Usar bash para ejecutar el script
CMD ["bash", "start.sh"]
