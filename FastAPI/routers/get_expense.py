from fastapi import APIRouter,HTTPException,status,Depends
from schemas.add_expense_schema import addExpenseModel
from models.add_expense_model import Expense
from models.database import Session,engine
from schemas.authentication_schema import LoginModel
from utils import oauth2
from models.user_model import User


get_expense_router = APIRouter(tags=["GET"] )
session=Session(bind=engine)


@get_expense_router.get("/get_expense")
def get_expense(currentUser:LoginModel = Depends(oauth2.get_current_user)):
    expense = session.query(Expense).filter(Expense.user_id == currentUser.id).all()
    return expense
