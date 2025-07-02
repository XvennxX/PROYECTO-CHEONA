from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import json

# Importar rutas
from app.routes import user
from app.routes.auth_routes import router as auth_router
from app.routes.reservation_routes import router as reservation_routes
from app.routes.mensaje_routes import router as mensaje_router
from app.routes import alojamiento_routes
from app.routes.galeria_routes import router as galeria_router

app = FastAPI(title="Finca Cheona API", version="1.0.0")

# Configurar respuesta JSON con UTF-8
@app.middleware("http")
async def add_utf8_header(request, call_next):
    response = await call_next(request)
    if "application/json" in response.headers.get("content-type", ""):
        response.headers["content-type"] = "application/json; charset=utf-8"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "API de Finca Cheona - Sistema de Reservas"}

app.include_router(auth_router)

app.include_router(reservation_routes)

app.include_router(mensaje_router)

app.include_router(alojamiento_routes.router)

app.include_router(galeria_router)
