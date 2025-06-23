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
    nombre: Optional[str]
    estado: Optional[str]
    capacidad: Optional[int]
    tipo: Optional[str]
    descripcion: Optional[str]
    comodidades: Optional[List[str]]
    precio_por_noche: Optional[float]
    imagenes: Optional[List[str]]
    servicios_adicionales: Optional[List[str]]
    politicas: Optional[str]

class Alojamiento(AlojamientoBase):
    id: int

    class Config:
        orm_mode = True
    