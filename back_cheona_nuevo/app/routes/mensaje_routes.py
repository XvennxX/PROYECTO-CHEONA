from fastapi import APIRouter, Request
from app.models.mensaje_models import ConversacionCreate, MensajeCreate
from app.services import mensaje_service
from typing import List

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/conversacion", response_model=int)
def crear_conversacion(data: ConversacionCreate):
    return mensaje_service.crear_conversacion(data.id_usuario_cliente)

@router.post("/mensaje", response_model=int)
def enviar_mensaje(data: MensajeCreate):
    return mensaje_service.enviar_mensaje(data)

@router.get("/conversaciones", response_model=List[dict])
def listar_conversaciones(id_usuario_cliente: int = None, rol: str = None):
    # Si no se pasa rol, por defecto admin
    if not rol:
        rol = "admin"
    return mensaje_service.listar_conversaciones(id_usuario_cliente, rol)

@router.get("/mensajes/{id_conversacion}", response_model=List[dict])
def listar_mensajes(id_conversacion: int):
    return mensaje_service.listar_mensajes(id_conversacion)

@router.post("/marcar_leidos/{id_conversacion}")
def marcar_leidos(id_conversacion: int, remitente: str):
    mensaje_service.marcar_leidos(id_conversacion, remitente)
    return {"ok": True}
