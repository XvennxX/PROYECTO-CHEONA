from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    password: str
    rol: str = "client"

class UserUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    email: Optional[str] = None
    telefono: Optional[str] = None
    documento_identidad: Optional[str] = None
    password: Optional[str] = None
    rol: Optional[str] = None
