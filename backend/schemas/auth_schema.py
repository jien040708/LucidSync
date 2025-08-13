from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class RegisterIn(BaseModel):
    user_id: str = Field(min_length=3, max_length=50)
    phone_number: str = Field(min_length=5, max_length=20)
    password: str = Field(min_length=6)

class LoginIn(BaseModel):
    user_id: str
    password: str

class UserOut(BaseModel):
    id: int
    user_id: str
    phone_number: str
    created_at: Optional[datetime] = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"