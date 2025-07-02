import mysql.connector
import os
from fastapi import Depends
from sqlalchemy.orm import declarative_base
import time

Base = declarative_base()

# Variables para configuración de BD
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "db"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "cheona"),
    "password": os.getenv("DB_PASSWORD", "cheona123"),
    "database": os.getenv("DB_NAME", "finca_cheona"),
    "charset": "utf8mb4",
    "collation": "utf8mb4_unicode_ci",
    "use_unicode": True,
    "autocommit": True
}

def wait_for_db(max_retries=60):
    """Espera a que la base de datos esté disponible"""
    print("🔄 Waiting for database connection...")
    
    for attempt in range(max_retries):
        try:
            connection = mysql.connector.connect(**DB_CONFIG, connect_timeout=5)
            connection.close()
            print("✅ Database connection successful!")
            return True
        except mysql.connector.Error as e:
            print(f"⏳ Database attempt {attempt + 1}/{max_retries} - {str(e)[:50]}...")
            time.sleep(3)
    
    raise Exception("❌ Could not connect to database after maximum retries")

def get_db_connection():
    """Obtiene una conexión a la base de datos con configuración de codificación"""
    connection = mysql.connector.connect(**DB_CONFIG)
    # Asegurar que la conexión use la codificación correcta
    cursor = connection.cursor()
    cursor.execute("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci")
    cursor.execute("SET CHARACTER SET utf8mb4")
    cursor.execute("SET character_set_connection=utf8mb4")
    cursor.close()
    return connection

def get_db():
    """Dependency para FastAPI"""
    db = get_db_connection()
    try:
        yield db
    finally:
        db.close()

# Variables globales para compatibilidad con código existente
def get_cursor_and_db():
    """Obtiene cursor y conexión para compatibilidad con código existente"""
    mydb = get_db_connection()
    cursor = mydb.cursor()
    return cursor, mydb

# Inicializar solo cuando se solicite
mydb = None
cursor = None

def init_db():
    """Inicializa la conexión global de base de datos"""
    global mydb, cursor
    print("🚀 Initializing database connection...")
    wait_for_db()
    mydb = get_db_connection()
    cursor = mydb.cursor()
    print("✅ Database initialized successfully!")