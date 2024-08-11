from fastapi import APIRouter,HTTPException,status
from schemas.authentication_schema import SignUpModel,LoginModel
from werkzeug.security import generate_password_hash , check_password_hash
from models.login_model import Login
from models.database import Session,engine
from utils import JWTtoken

auth_router = APIRouter(tags=["Authentication"] )
session=Session(bind=engine)


@auth_router.post("/signup")
async def signup(request: SignUpModel):
    signup_user = session.query(Login).filter(Login.username == request.username).first()
    if signup_user:
        print(signup_user)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User with username already exists")
    else: 
        new_user = Login(
            username = request.username,
            password = generate_password_hash(request.password)
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return new_user
    
    


@auth_router.post("/login")
async def login(request: LoginModel):
    login_user = session.query(Login).filter(Login.username == request.username).first()

    if login_user and check_password_hash(login_user.password,request.password):

        access_token = JWTtoken.create_access_token(data={"sub": login_user.username})
        return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Couldn't Authenticate User!!")