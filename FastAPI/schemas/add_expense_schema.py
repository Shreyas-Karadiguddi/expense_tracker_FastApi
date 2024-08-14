from pydantic import BaseModel
from typing import Optional
from datetime import date

class addExpenseModel(BaseModel):
    category: str
    description: str
    amount: float
    date: date
 
    class Config:
        from_attributes = True 
        
