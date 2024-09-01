from fastapi import APIRouter,HTTPException,status,Depends
from schemas.add_expense_schema import addExpenseModel
from models.add_expense_model import Expense
from models.database import Session,engine
from schemas.authentication_schema import LoginModel
from utils import oauth2
from models.user_model import User
from fastapi.encoders import jsonable_encoder


add_expense_router = APIRouter(tags=["POST"] )
session=Session(bind=engine)

@add_expense_router.post("/add_expense")
def add_expense(request : addExpenseModel, currentUser:LoginModel = Depends(oauth2.get_current_user)):
    user = session.query(User).filter(User.username == currentUser.username).first()

    if request.amount <= 0:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Amount should be greater than 0")
    
    add_expense = Expense(
        category = request.category,
        description = request.description,
        amount = request.amount,
        date = request.date,
 
    )
    add_expense.user = user  

    session.add(add_expense)
    session.commit()
    session.refresh(add_expense)
    return {"Category": add_expense.category, "Amount": add_expense.amount,"Message": "Expense created successfully"}
    


