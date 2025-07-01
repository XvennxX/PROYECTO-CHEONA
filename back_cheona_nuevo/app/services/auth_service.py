import hashlib
from datetime import timedelta

from fastapi import HTTPException

from app.database.connection import cursor
from app.models.auth_model import LoginRequest
from app.utils.jwt_utils import create_access_token


def login_user(data: LoginRequest):
    query = "SELECT id_cliente, nombre, apellido, email, telefono, documento_identidad, password, rol, estado FROM cliente WHERE email = %s"
    cursor.execute(query, (data.email,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    (
        id_cliente,
        nombre,
        apellido,
        email,
        telefono,
        documento_identidad,
        hashed_password,
        rol,
        estado,
    ) = user
    if not rol:
        rol = "client"

    if estado != "activo":
        raise HTTPException(
            status_code=403, detail="Cuenta inactiva. Contacte al administrador."
        )

    if hashlib.sha256(data.password.encode()).hexdigest() != hashed_password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Generar el token con expiración corta (ej: 1 día)
    access_token = create_access_token(
        {"id_cliente": id_cliente}, expires_delta=timedelta(days=1)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id_cliente": id_cliente,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "documento_identidad": documento_identidad,
            "rol": rol,
        },
        "expires_in": 86400,  # 1 día en segundos
    }
