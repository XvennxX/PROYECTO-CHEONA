from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user
from app.routes.auth_routes import router as auth_router
from app.routes.reservation_routes import router as reservation_routes
from app.routes.mensaje_routes import router as mensaje_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "API de Usuarios"}

app.include_router(auth_router)

app.include_router(reservation_routes)

app.include_router(mensaje_router)



