from app.database.connection import get_cursor_and_db
from app.models.mensaje_models import Conversacion, ConversacionCreate, Mensaje, MensajeCreate
from fastapi import HTTPException
from typing import List
from datetime import datetime

# Crear una conversación (si no existe para el usuario)
def crear_conversacion(id_usuario_cliente: int) -> int:
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("SELECT id_conversacion FROM conversacion WHERE id_usuario_cliente = %s", (id_usuario_cliente,))
        row = cursor.fetchone()
        if row:
            return row[0]
        cursor.execute("INSERT INTO conversacion (id_usuario_cliente, fecha_creacion) VALUES (%s, %s)", (id_usuario_cliente, datetime.now()))
        mydb.commit()
        return cursor.lastrowid
    except Exception as e:
        mydb.rollback()
        raise HTTPException(status_code=400, detail=f"Error al crear conversación: {e}")
    finally:
        cursor.close()
        mydb.close()

# Enviar mensaje
def enviar_mensaje(mensaje: MensajeCreate):
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("INSERT INTO mensaje (id_conversacion, remitente, mensaje, fecha_envio, leido) VALUES (%s, %s, %s, %s, %s)",
                       (mensaje.id_conversacion, mensaje.remitente, mensaje.mensaje, datetime.now(), 0))
        mydb.commit()
        return cursor.lastrowid
    except Exception as e:
        mydb.rollback()
        raise HTTPException(status_code=400, detail=f"Error al enviar mensaje: {e}")
    finally:
        cursor.close()
        mydb.close()

# Listar conversaciones (admin ve todas, cliente solo las suyas)
def listar_conversaciones(id_usuario_cliente: int = None, rol: str = None):
    cursor, mydb = get_cursor_and_db()
    try:
        print(f"[DEBUG] listar_conversaciones - id_usuario_cliente: {id_usuario_cliente}, rol: {rol}")
        
        if rol == "admin":
            remitente_objetivo = "cliente"
        else:
            remitente_objetivo = "admin"
        print(f"[DEBUG] remitente_objetivo usado en SQL: {remitente_objetivo}")
        
        if id_usuario_cliente:
            cursor.execute(
                '''SELECT c.*, CONCAT(u.nombre, ' ', u.apellido) as nombre_cliente,
                          (SELECT COUNT(*) FROM mensaje m WHERE m.id_conversacion = c.id_conversacion AND m.leido = 0 AND m.remitente = %s) as no_leidos
                   FROM conversacion c
                   JOIN cliente u ON c.id_usuario_cliente = u.id_cliente
                   WHERE c.id_usuario_cliente = %s''',
                (remitente_objetivo, id_usuario_cliente)
            )
        else:
            cursor.execute(
                '''SELECT c.*, CONCAT(u.nombre, ' ', u.apellido) as nombre_cliente,
                          (SELECT COUNT(*) FROM mensaje m WHERE m.id_conversacion = c.id_conversacion AND m.leido = 0 AND m.remitente = %s) as no_leidos
                   FROM conversacion c
                   JOIN cliente u ON c.id_usuario_cliente = u.id_cliente''',
                (remitente_objetivo,)
            )
        
        results = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in results]
    finally:
        cursor.close()
        mydb.close()

# Listar mensajes de una conversación
def listar_mensajes(id_conversacion: int) -> List[Mensaje]:
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("SELECT * FROM mensaje WHERE id_conversacion = %s ORDER BY fecha_envio ASC", (id_conversacion,))
        results = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in results]
    finally:
        cursor.close()
        mydb.close()

# Marcar mensajes como leídos
def marcar_leidos(id_conversacion: int, remitente: str):
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("UPDATE mensaje SET leido = 1 WHERE id_conversacion = %s AND remitente != %s", (id_conversacion, remitente))
        mydb.commit()
    except Exception as e:
        mydb.rollback()
        raise HTTPException(status_code=400, detail=f"Error al marcar mensajes como leídos: {e}")
    finally:
        cursor.close()
        mydb.close()
