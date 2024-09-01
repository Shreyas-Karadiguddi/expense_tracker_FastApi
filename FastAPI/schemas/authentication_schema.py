from pydantic import BaseModel
from typing import Optional

class SignUpModel(BaseModel):
    firstName: str
    lastName: str
    username: str
    password: str
    confirmPassword: str

    class Config:
        from_attributes = True 
        

class LoginModel(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    id: Optional[int] = None