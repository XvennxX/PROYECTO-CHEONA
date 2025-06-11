from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Conversacion(BaseModel):
    id_conversacion: Optional[int]
    id_usuario_cliente: int
    fecha_creacion: Optional[datetime]

class Mensaje(BaseModel):
    id_mensaje: Optional[int]
    id_conversacion: int
    remitente: str  # 'cliente' o 'admin'
    mensaje: str
    fecha_envio: Optional[datetime]
    leido: Optional[bool] = False

# Modelos para crear
class ConversacionCreate(BaseModel):
    id_usuario_cliente: int

class MensajeCreate(BaseModel):
    id_conversacion: int
    remitente: str
    mensaje: str
