from fastapi import APIRouter,HTTPException,status,Depends
from schemas.add_expense_schema import addExpenseModel
from models.add_expense_model import Expense
from models.database import Session,engine
from schemas.authentication_schema import LoginModel
from schemas.edit_expense_schema import editExpenseModel
from utils import oauth2
from models.user_model import User


edit_expense_router = APIRouter(tags=["PATCH"] )
session=Session(bind=engine)


@edit_expense_router.patch("/edit_expense/{id}")
def edit_expense(id,request:editExpenseModel,currentUser:LoginModel = Depends(oauth2.get_current_user)):
    expense = session.query(Expense).filter(Expense.id == id).first()

    if expense:
        if request.editcategory is not None:
            expense.category = request.editcategory

        if request.editdescription is not None:
            expense.description = request.editdescription

        if request.editamount is not None:
            expense.amount = request.editamount

        if request.editdate is not None:
            expense.date = request.editdate



        session.commit()
    return {"message": "Edit Expense Successfully Completed", "expense": expense}
