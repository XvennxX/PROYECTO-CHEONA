from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.galeria_service import save_galeria_image, list_galeria_images
from app.models.galeria_model import GaleriaImageUploadResponse

router = APIRouter(prefix="/galeria", tags=["Galeria"])

@router.post("/upload-image", response_model=GaleriaImageUploadResponse)
def upload_galeria_image(tipo: str = Form(...), file: UploadFile = File(...)):
    try:
        url = save_galeria_image(tipo, file)
        return {"url": url}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al guardar la imagen")

@router.get("/images/{tipo}")
def get_galeria_images(tipo: str):
    try:
        return {"imagenes": list_galeria_images(tipo)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al listar las imágenes")
