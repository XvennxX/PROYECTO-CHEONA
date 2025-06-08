from pydantic import BaseModel

class User(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    password: str
    rol: str = "client"
