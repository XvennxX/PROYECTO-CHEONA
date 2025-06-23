from sqlalchemy import Column, Integer, String, Float, Text
from sqlalchemy.dialects.mysql import JSON
from app.database.connection import Base

class AlojamientoORM(Base):
    __tablename__ = "alojamientos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    estado = Column(String(50), nullable=False)
    capacidad = Column(Integer, nullable=False)
    tipo = Column(String(50), nullable=False)
    descripcion = Column(Text, nullable=False)
    comodidades = Column(JSON, nullable=False)
    precio_por_noche = Column(Float, nullable=False)
    imagenes = Column(JSON, nullable=False)
    servicios_adicionales = Column(JSON)
    politicas = Column(Text)
