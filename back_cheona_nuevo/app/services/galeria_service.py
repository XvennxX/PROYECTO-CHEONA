import os
from fastapi import UploadFile
import unicodedata

def normalize_tipo(tipo: str) -> str:
    tipo = tipo.strip().lower()
    # Normaliza pero mantiene la ñ
    tipo = unicodedata.normalize('NFKC', tipo)
    return tipo

def save_galeria_image(tipo: str, file: UploadFile) -> str:
    tipos_validos = ["finca", "cabaña", "glamping"]
    tipo_normalizado = normalize_tipo(tipo)
    if tipo_normalizado not in tipos_validos:
        raise ValueError("Tipo de alojamiento no válido. Solo se permiten: finca, cabaña, glamping")
    folder = f"app/static/alojamientos/{tipo_normalizado}"
    os.makedirs(folder, exist_ok=True)
    file_location = f"{folder}/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    url = f"/static/alojamientos/{tipo_normalizado}/{file.filename}"
    return url

def list_galeria_images(tipo: str) -> list:
    tipos_validos = ["finca", "cabaña", "glamping"]
    tipo_normalizado = normalize_tipo(tipo)
    if tipo_normalizado not in tipos_validos:
        raise ValueError("Tipo de alojamiento no válido. Solo se permiten: finca, cabaña, glamping")
    folder = f"app/static/alojamientos/{tipo_normalizado}"
    if not os.path.exists(folder):
        return []
    return [f"/static/alojamientos/{tipo_normalizado}/" + f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
