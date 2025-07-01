from pydantic import BaseModel


class GaleriaImageUploadResponse(BaseModel):
    url: str
