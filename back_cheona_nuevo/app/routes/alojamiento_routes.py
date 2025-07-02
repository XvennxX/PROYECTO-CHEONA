from fastapi import APIRouter
from app.models.alojamiento_model import Alojamiento, AlojamientoCreate, AlojamientoUpdate
from app.services import alojamiento_service

router = APIRouter(prefix="/alojamientos", tags=["Alojamientos"])

@router.get("/", response_model=list[Alojamiento])
def listar_alojamientos():
    return alojamiento_service.get_alojamientos()

@router.get("/{id}", response_model=Alojamiento)
def ver_alojamiento(id: int):
    return alojamiento_service.get_alojamiento_detalle(id)

@router.post("/", response_model=Alojamiento)
def crear_alojamiento(data: AlojamientoCreate):
    return alojamiento_service.crear_alojamiento(data)

@router.put("/{id}", response_model=Alojamiento)
def actualizar_alojamiento_put(id: int, data: AlojamientoUpdate):
    return alojamiento_service.actualizar_alojamiento(id, data)

@router.patch("/{id}", response_model=Alojamiento)
def actualizar_alojamiento_patch(id: int, data: AlojamientoUpdate):
    return alojamiento_service.actualizar_alojamiento(id, data)

@router.delete("/{id}")
def eliminar_alojamiento(id: int):
    return alojamiento_service.eliminar_alojamiento(id)
