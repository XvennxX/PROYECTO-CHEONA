import hashlib
from fastapi import HTTPException
from app.database.connection import cursor
from app.models.auth_model import LoginRequest
from app.utils.jwt_utils import create_access_token

def login_user(data: LoginRequest):
    query = "SELECT id_cliente, nombre, password, email, rol FROM cliente WHERE email = %s"
    cursor.execute(query, (data.email,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    id_cliente, nombre, hashed_password, email, rol = user
    if not rol:
        rol = 'client'

    if hashlib.sha256(data.password.encode()).hexdigest() != hashed_password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Generar el token con el id_cliente
    access_token = create_access_token({"id_cliente": id_cliente})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id_cliente": id_cliente,
            "nombre": nombre,
            "email": email,
            "rol": rol
        }
    }
