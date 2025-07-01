from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes import alojamiento_routes, user
from app.routes.auth_routes import router as auth_router
from app.routes.galeria_routes import router as galeria_router
from app.routes.mensaje_routes import router as mensaje_router
from app.routes.reservation_routes import router as reservation_routes

app = FastAPI()

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
    return {"message": "API de Usuarios"}


app.include_router(auth_router)

app.include_router(reservation_routes)

app.include_router(mensaje_router)

app.include_router(alojamiento_routes.router)

app.include_router(galeria_router)
