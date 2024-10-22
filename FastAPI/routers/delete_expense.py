from fastapi import APIRouter,HTTPException,status,Depends
from schemas.add_expense_schema import addExpenseModel
from models.add_expense_model import Expense
from models.database import Session,engine
from schemas.authentication_schema import LoginModel
from utils import oauth2
from models.user_model import User


delete_expense_router = APIRouter(tags=["DELETE"] )
session=Session(bind=engine)


@delete_expense_router.delete("/delete_expense/{id}")
def delete_expense(id,currentUser:LoginModel = Depends(oauth2.get_current_user)):
    expense = session.query(Expense).filter(Expense.id == id).first()

    session.delete(expense)
    session.commit()
    return expense
