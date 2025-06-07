from fastapi import APIRouter
from app.models.auth_model import LoginRequest, UserResponse
from app.services.auth_service import login_user

router = APIRouter()

@router.post("/api/login", response_model=UserResponse)
async def login(data: LoginRequest):
    return login_user(data)



