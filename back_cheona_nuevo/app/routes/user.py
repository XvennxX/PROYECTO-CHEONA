from fastapi import APIRouter, HTTPException, status
from app.models.user import User, UserUpdate
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
    INSERT INTO cliente (nombre, apellido, email, telefono, documento_identidad, password, rol, estado)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(insert_query, (
            user.nombre, user.apellido, user.email,
            user.telefono, user.documento_identidad, hashed_pw, "client", "activo"
        ))
        mydb.commit()
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")
    return {"message": "Usuario insertado exitosamente"}

@router.patch("/{id}")
def update_user(id: int, user: UserUpdate):
    # Construir dinámicamente la consulta y los valores
    campos = []
    valores = []
    if user.nombre is not None:
        campos.append("nombre=%s")
        valores.append(user.nombre)
    if user.apellido is not None:
        campos.append("apellido=%s")
        valores.append(user.apellido)
    if user.email is not None:
        campos.append("email=%s")
        valores.append(user.email)
    if user.telefono is not None:
        campos.append("telefono=%s")
        valores.append(user.telefono)
    if user.documento_identidad is not None:
        campos.append("documento_identidad=%s")
        valores.append(user.documento_identidad)
    if user.password is not None:
        campos.append("password=%s")
        valores.append(hash_password(user.password))
    if user.rol is not None:
        campos.append("rol=%s")
        valores.append(user.rol)
    if not campos:
        raise HTTPException(status_code=400, detail="No se enviaron campos para actualizar")
    update_query = f"UPDATE cliente SET {', '.join(campos)} WHERE id_cliente=%s"
    valores.append(id)
    try:
        cursor.execute(update_query, tuple(valores))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error al actualizar: {err}")
    return {"message": "Usuario actualizado", "id": id}

@router.delete("/{id}")
def delete_user(id: int):
    # Soft delete: actualizar estado a 'inactivo' en vez de borrar
    update_query = "UPDATE cliente SET estado = 'inactivo' WHERE id_cliente = %s"
    try:
        cursor.execute(update_query, (id,))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"Error al eliminar: {err}")
    return {"message": f"Usuario con id {id} marcado como inactivo"}

