from datetime import date, datetime
from typing import Optional, Union

from pydantic import BaseModel


class ReservationCreate(BaseModel):
    id_cliente: int
    id_alojamiento: int
    fecha_inicio: Union[str, datetime]  # Acepta string o datetime
    fecha_fin: Union[str, datetime]  # Acepta string o datetime
    cantidad_personas: int
    metodo_pago: str
    observaciones: Optional[str] = None
    costo_total: float


class ReservationUpdate(BaseModel):
    fecha_inicio: Optional[date]
    fecha_fin: Optional[date]
    cantidad_personas: Optional[int]


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
