from fastapi import HTTPException, status
from datetime import datetime
from typing import List
from ..models.reservation_model import ReservationCreate, ReservationUpdate, ReservationResponse
from app.database.connection import cursor, mydb

def create_reservation(data: ReservationCreate):
    print(">>> create_reservation ejecutado")
    fecha_reserva = datetime.now()
    insert_query = """
        INSERT INTO reservas (id_cliente, id_alojamiento, fecha_reserva, fecha_inicio, fecha_fin, cantidad_personas,
                            estado, metodo_pago, pago_confirmado, observaciones, costo_total)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data.id_cliente,
        data.id_alojamiento,
        fecha_reserva,
        data.fecha_inicio,
        data.fecha_fin,
        data.cantidad_personas,
        "pendiente",            # Estado inicial
        data.metodo_pago,
        False,                  # Pago no confirmado inicialmente
        data.observaciones,
        data.costo_total
    )
    try:
        cursor.execute(insert_query, values)
        mydb.commit()
        return {"message": "Reserva creada exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear la reserva: {e}")

def check_availability(id_alojamiento: int, fecha_inicio, fecha_fin) -> bool:
    # Verificar que no haya reservas que se crucen con el rango dado
    query = """
        SELECT COUNT(*) FROM reserva
        WHERE id_alojamiento = %s AND estado IN ('pendiente', 'confirmada') 
        AND (fecha_inicio <= %s AND fecha_fin >= %s)
    """
    cursor.execute(query, (id_alojamiento, fecha_fin, fecha_inicio))
    count = cursor.fetchone()[0]
    return count == 0

def get_user_reservations(id_cliente: int) -> List[ReservationResponse]:
    query = """
        SELECT * FROM reserva WHERE id_cliente = %s ORDER BY fecha_reserva DESC
    """
    cursor.execute(query, (id_cliente,))
    results = cursor.fetchall()
    if not results:
        raise HTTPException(status_code=404, detail="No se encontraron reservas para este usuario")
    return [ReservationResponse(**dict(zip(cursor.column_names, row))) for row in results]

def get_all_reservations() -> List[ReservationResponse]:
    query = "SELECT * FROM reserva ORDER BY fecha_reserva DESC"
    cursor.execute(query)
    results = cursor.fetchall()
    return [ReservationResponse(**dict(zip(cursor.column_names, row))) for row in results]

def update_reservation(id_reserva: int, data: ReservationUpdate):
    # Construir query dinámico con solo campos que vienen en data
    fields = []
    values = []
    for field, value in data.dict(exclude_unset=True).items():
        fields.append(f"{field} = %s")
        values.append(value)
    if not fields:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    update_query = f"UPDATE reserva SET {', '.join(fields)} WHERE id_reserva = %s"
    values.append(id_reserva)

    try:
        cursor.execute(update_query, tuple(values))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"message": "Reserva actualizada con éxito", "id_reserva": id_reserva}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al actualizar la reserva: {e}")

def cancel_reservation(id_reserva: int):
    # En lugar de borrar, se cambia estado a 'cancelada'
    query = "UPDATE reserva SET estado = 'cancelada' WHERE id_reserva = %s"
    try:
        cursor.execute(query, (id_reserva,))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"message": "Reserva cancelada exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al cancelar la reserva: {e}")

def get_reservation_details(id_reserva: int) -> ReservationResponse:
    query = "SELECT * FROM reserva WHERE id_reserva = %s"
    cursor.execute(query, (id_reserva,))
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return ReservationResponse(**dict(zip(cursor.column_names, result)))

def confirm_reservation_payment(id_reserva: int):
    query = "UPDATE reserva SET pago_confirmado = TRUE, estado = 'confirmada' WHERE id_reserva = %s"
    try:
        cursor.execute(query, (id_reserva,))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"message": "Pago confirmado y reserva actualizada"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al confirmar pago: {e}")
