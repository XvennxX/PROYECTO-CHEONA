from fastapi import APIRouter, HTTPException, status
from app.models.user import User
from app.database.connection import cursor, mydb
from app.services.user_service import hash_password

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/")
def get_user(id: int):
    query = """
    SELECT id_cliente, nombre, apellido, email, telefono, documento_identidad
    FROM cliente WHERE id_cliente = %s
    """
    cursor.execute(query, (id,))
    return cursor.fetchall()

@router.post("/", status_code=status.HTTP_201_CREATED)
def insert_user(user: User):
    hashed_pw = hash_password(user.password)
    insert_query = """
    INSERT INTO cliente (nombre, apellido, email, telefono, documento_identidad, password, rol)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(insert_query, (
            user.nombre, user.apellido, user.email,
            user.telefono, user.documento_identidad, hashed_pw, "client"
        ))
        mydb.commit()
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")
    return {"message": "Usuario insertado exitosamente"}

@router.patch("/{id}")
def update_user(id: int, user: User):
    hashed_pw = hash_password(user.password)
    update_query = """
    UPDATE cliente
    SET nombre=%s, apellido=%s, email=%s, telefono=%s, documento_identidad=%s, password=%s
    WHERE id_cliente=%s
    """
    try:
        cursor.execute(update_query, (
            user.nombre, user.apellido, user.email,
            user.telefono, user.documento_identidad, hashed_pw, id
        ))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error al actualizar: {err}")
    return {"message": "Usuario actualizado", "id": id}

@router.delete("/{id}")
def delete_user(id: int):
    delete_query = "DELETE FROM cliente WHERE id_cliente = %s"
    try:
        cursor.execute(delete_query, (id,))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error al eliminar: {err}")
    return {"message": f"Usuario con id {id} eliminado"}

