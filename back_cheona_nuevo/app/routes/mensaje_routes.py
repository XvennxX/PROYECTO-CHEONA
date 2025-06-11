from fastapi import APIRouter, Depends, Request
from app.models.mensaje_models import ConversacionCreate, MensajeCreate
from app.services import mensaje_service
from app.database.connection import get_db
from typing import List

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/conversacion", response_model=int)
def crear_conversacion(data: ConversacionCreate, db=Depends(get_db)):
    return mensaje_service.crear_conversacion(db, data.id_usuario_cliente)

@router.post("/mensaje", response_model=int)
def enviar_mensaje(data: MensajeCreate, db=Depends(get_db)):
    return mensaje_service.enviar_mensaje(db, data)

@router.get("/conversaciones", response_model=List[dict])
def listar_conversaciones(id_usuario_cliente: int = None, db=Depends(get_db)):
    return mensaje_service.listar_conversaciones(db, id_usuario_cliente)

@router.get("/mensajes/{id_conversacion}", response_model=List[dict])
def listar_mensajes(id_conversacion: int, db=Depends(get_db)):
    return mensaje_service.listar_mensajes(db, id_conversacion)

@router.post("/marcar_leidos/{id_conversacion}")
def marcar_leidos(id_conversacion: int, remitente: str, db=Depends(get_db)):
    mensaje_service.marcar_leidos(db, id_conversacion, remitente)
    return {"ok": True}
