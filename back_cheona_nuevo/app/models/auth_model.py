from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id_cliente: int
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    rol: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse