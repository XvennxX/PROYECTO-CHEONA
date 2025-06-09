from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id_cliente: int
    nombre: str
    email: str
    rol: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse