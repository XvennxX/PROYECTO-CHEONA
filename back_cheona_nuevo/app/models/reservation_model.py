from pydantic import BaseModel
from typing import Optional, Union
from datetime import datetime, date

class ReservationCreate(BaseModel):
    id_cliente: int
    id_alojamiento: int
    fecha_inicio: Union[str, datetime]  # Acepta string o datetime
    fecha_fin: Union[str, datetime]     # Acepta string o datetime
    cantidad_personas: int
    metodo_pago: str
    observaciones: Optional[str] = None
    costo_total: float

class ReservationUpdate(BaseModel):
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    cantidad_personas: Optional[int] = None
    metodo_pago: Optional[str] = None
    estado: Optional[str] = None
    pago_confirmado: Optional[bool] = None
    observaciones: Optional[str] = None
    costo_total: Optional[float] = None

class ReservationResponse(BaseModel):
    id_reserva: int
    id_cliente: int
    id_alojamiento: int
    fecha_reserva: datetime
    fecha_inicio: date
    fecha_fin: date
    cantidad_personas: int
    estado: str
    metodo_pago: str
    pago_confirmado: bool
    observaciones: Optional[str]
    costo_total: float

# Modelo para alojamientos
class AlojamientoResponse(BaseModel):
    id: int
    nombre: str
    estado: str
    capacidad: int
    tipo: str
    descripcion: Optional[str]
    comodidades: Optional[str]
    precio_por_noche: float
    imagenes: Optional[str]
    servicios_adicionales: Optional[str]
    politicas: Optional[str]

# Modelo para respuesta completa de reserva con alojamiento
class ReservationCompleteResponse(BaseModel):
    id_reserva: int
    id_cliente: int
    alojamiento: AlojamientoResponse
    fecha_reserva: datetime
    fecha_inicio: date
    fecha_fin: date
    cantidad_personas: int
    estado: str
    metodo_pago: str
    pago_confirmado: bool
    observaciones: Optional[str]
    costo_total: float
