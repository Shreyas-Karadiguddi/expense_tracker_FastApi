from fastapi import APIRouter,HTTPException,status
from schemas.authentication_schema import SignUpModel,LoginModel
from werkzeug.security import generate_password_hash , check_password_hash
from models.user_model import User
from models.database import Session,engine
from utils import JWTtoken

auth_router = APIRouter(tags=["Authentication"] )
session=Session(bind=engine)


@auth_router.post("/signup")
async def signup(request: SignUpModel):
    signup_user = session.query(User).filter(User.username == request.username).first()

    if signup_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User with username already exists")

    if request.password != request.confirmPassword:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Passwords do not match")
    
    new_user = User(
        firstName = request.firstName,
        lastName = request.lastName,
        username = request.username,
        password = generate_password_hash(request.password)
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"username": new_user.username, "message": "User created successfully"}


@auth_router.post("/login")
async def login(request: LoginModel):
    login_user = session.query(User).filter(User.username == request.username).first()

    if login_user and check_password_hash(login_user.password,request.password):

        access_token = JWTtoken.create_access_token(data={"sub": login_user.username,"sub2":login_user.id})
        return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Couldn't Authenticate User")