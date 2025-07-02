#!/bin/bash

echo "🚀 Starting Finca Cheona Backend..."

# Función para esperar por la base de datos
wait_for_database() {
    echo "⏳ Waiting for database to be ready..."
    
    for i in {1..60}; do
        if python3 -c "
import mysql.connector
import os
import sys

try:
    connection = mysql.connector.connect(
        host='db',
        port=3306,
        user='cheona',
        password='cheona123',
        database='finca_cheona',
        connect_timeout=5
    )
    connection.close()
    print('✅ Database connection successful!')
    sys.exit(0)
except Exception as e:
    print(f'⏳ Database not ready yet... ({i}/60)')
    sys.exit(1)
"; then
            echo "✅ Database is ready!"
            return 0
        fi
        sleep 3
    done
    
    echo "❌ Database is not available after 3 minutes"
    return 1
}

# Esperar por la base de datos
if wait_for_database; then
    echo "🎯 Starting FastAPI server..."
    uvicorn app.main:app --host 0.0.0.0 --port 8000
else
    echo "❌ Cannot start server - database not available"
    exit 1
fi
