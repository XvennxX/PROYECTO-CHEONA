from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.alojamiento_model import Alojamiento, AlojamientoCreate, AlojamientoUpdate
from app.services import alojamiento_service
from app.database.connection import get_db

router = APIRouter(prefix="/alojamientos", tags=["Alojamientos"])

@router.get("/", response_model=list[Alojamiento])
def listar_alojamientos(db: Session = Depends(get_db)):
    return alojamiento_service.get_alojamientos(db)

@router.get("/{id}", response_model=Alojamiento)
def ver_alojamiento(id: int, db: Session = Depends(get_db)):
    return alojamiento_service.get_alojamiento_detalle(db, id)

@router.post("/", response_model=Alojamiento)
def crear_alojamiento(data: AlojamientoCreate, db: Session = Depends(get_db)):
    return alojamiento_service.crear_alojamiento(db, data)

@router.put("/{id}", response_model=Alojamiento)
def actualizar_alojamiento_put(id: int, data: AlojamientoUpdate, db: Session = Depends(get_db)):
    return alojamiento_service.actualizar_alojamiento(db, id, data)

@router.patch("/{id}", response_model=Alojamiento)
def actualizar_alojamiento_patch(id: int, data: AlojamientoUpdate, db: Session = Depends(get_db)):
    return alojamiento_service.actualizar_alojamiento(db, id, data)

@router.delete("/{id}")
def eliminar_alojamiento(id: int, db: Session = Depends(get_db)):
    return alojamiento_service.eliminar_alojamiento(db, id)
