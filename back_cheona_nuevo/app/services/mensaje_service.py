from app.database.connection import get_db
from app.models.mensaje_models import Conversacion, ConversacionCreate, Mensaje, MensajeCreate
from fastapi import HTTPException
from typing import List
from datetime import datetime

# Crear una conversación (si no existe para el usuario)
def crear_conversacion(db, id_usuario_cliente: int) -> int:
    cursor = db.cursor()
    cursor.execute("SELECT id_conversacion FROM conversacion WHERE id_usuario_cliente = %s", (id_usuario_cliente,))
    row = cursor.fetchone()
    if row:
        return row[0]
    cursor.execute("INSERT INTO conversacion (id_usuario_cliente, fecha_creacion) VALUES (%s, %s)", (id_usuario_cliente, datetime.now()))
    db.commit()
    return cursor.lastrowid

# Enviar mensaje
def enviar_mensaje(db, mensaje: MensajeCreate):
    cursor = db.cursor()
    cursor.execute("INSERT INTO mensaje (id_conversacion, remitente, mensaje, fecha_envio, leido) VALUES (%s, %s, %s, %s, %s)",
                   (mensaje.id_conversacion, mensaje.remitente, mensaje.mensaje, datetime.now(), 0))
    db.commit()
    return cursor.lastrowid

# Listar conversaciones (admin ve todas, cliente solo las suyas)
def listar_conversaciones(db, id_usuario_cliente: int = None) -> List[Conversacion]:
    cursor = db.cursor(dictionary=True)
    if id_usuario_cliente:
        cursor.execute("SELECT * FROM conversacion WHERE id_usuario_cliente = %s", (id_usuario_cliente,))
    else:
        cursor.execute("SELECT * FROM conversacion")
    return cursor.fetchall()

# Listar mensajes de una conversación
def listar_mensajes(db, id_conversacion: int) -> List[Mensaje]:
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM mensaje WHERE id_conversacion = %s ORDER BY fecha_envio ASC", (id_conversacion,))
    return cursor.fetchall()

# Marcar mensajes como leídos
def marcar_leidos(db, id_conversacion: int, remitente: str):
    cursor = db.cursor()
    cursor.execute("UPDATE mensaje SET leido = 1 WHERE id_conversacion = %s AND remitente != %s", (id_conversacion, remitente))
    db.commit()
