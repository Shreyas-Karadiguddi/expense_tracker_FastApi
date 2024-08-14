from fastapi import APIRouter,HTTPException,status
from schemas.add_expense_schema import addExpenseModel
from models.add_expense_model import Expense
from models.database import Session,engine


add_expense_router = APIRouter(tags=["POST"] )
session=Session(bind=engine)



@add_expense_router.post("/add_expense")
def add_expense(request : addExpenseModel):

    if request.amount <= 0:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Amount should be greater than 0")
    
    add_expense = Expense(
        category = request.category,
        description = request.description,
        amount = request.amount,
        date = request.date,
    )

    session.add(add_expense)
    session.commit()
    session.refresh(add_expense)
    return {"Category": add_expense.category, "Amount": add_expense.amount,"Message": "Expense created successfully"}
    
    