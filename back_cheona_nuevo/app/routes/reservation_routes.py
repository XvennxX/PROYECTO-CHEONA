from fastapi import APIRouter, Depends, Query
from typing import List
from ..models.reservation_model import ReservationCreate, ReservationUpdate, ReservationResponse
from ..services.reservation_service import *

router = APIRouter()

@router.post("/reservas/", status_code=201)
def create_reservation_endpoint(data: ReservationCreate):
    return create_reservation(data)

@router.get("/reservas/disponibilidad")
def check_availability_endpoint(id_alojamiento: int, fecha_inicio: str, fecha_fin: str):
    # Las fechas vienen como string yyyy-mm-dd, parsear si quieres o dejar string para SQL
    disponible = check_availability(id_alojamiento, fecha_inicio, fecha_fin)
    return {"disponible": disponible}

@router.get("/reservas/usuario/{id_cliente}", response_model=List[ReservationResponse])
def get_user_reservations_endpoint(id_cliente: int):
    return get_user_reservations(id_cliente)

@router.get("/reservas/", response_model=List[ReservationResponse])
def get_all_reservations_endpoint():
    return get_all_reservations()

@router.patch("/reservas/{id_reserva}")
def update_reservation_endpoint(id_reserva: int, data: ReservationUpdate):
    return update_reservation(id_reserva, data)

@router.delete("/reservas/{id_reserva}")
def cancel_reservation_endpoint(id_reserva: int):
    return cancel_reservation(id_reserva)

@router.get("/reservas/{id_reserva}", response_model=ReservationResponse)
def get_reservation_details_endpoint(id_reserva: int):
    return get_reservation_details(id_reserva)

@router.post("/reservas/{id_reserva}/confirmar-pago")
def confirm_reservation_payment_endpoint(id_reserva: int):
    return confirm_reservation_payment(id_reserva)
