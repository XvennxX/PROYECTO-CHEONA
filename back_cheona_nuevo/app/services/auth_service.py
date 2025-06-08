import hashlib
from fastapi import HTTPException
from app.database.connection import cursor
from app.models.auth_model import LoginRequest, UserResponse

def login_user(data: LoginRequest) -> UserResponse:
    query = "SELECT nombre, password, email, rol FROM cliente WHERE email = %s"
    cursor.execute(query, (data.email,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    nombre, hashed_password, email, rol = user
    if not rol:
        rol = 'client'

    if hashlib.sha256(data.password.encode()).hexdigest() != hashed_password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return UserResponse(nombre=nombre, email=email, rol=rol)
