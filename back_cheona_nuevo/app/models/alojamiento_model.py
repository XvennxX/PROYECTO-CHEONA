from pydantic import BaseModel
from typing import List, Optional

class AlojamientoBase(BaseModel):
    nombre: str
    estado: str
    capacidad: int
    tipo: str
    descripcion: str
    comodidades: List[str]
    precio_por_noche: float
    imagenes: List[str]
    servicios_adicionales: Optional[List[str]] = []
    politicas: Optional[str] = ""

class AlojamientoCreate(AlojamientoBase):
    pass

class AlojamientoUpdate(BaseModel):
    nombre: Optional[str] = None
    estado: Optional[str] = None
    capacidad: Optional[int] = None
    tipo: Optional[str] = None
    descripcion: Optional[str] = None
    comodidades: Optional[List[str]] = None
    precio_por_noche: Optional[float] = None
    imagenes: Optional[List[str]] = None
    servicios_adicionales: Optional[List[str]] = None
    politicas: Optional[str] = None

class Alojamiento(AlojamientoBase):
    id: int

    class Config:
        orm_mode = True
    