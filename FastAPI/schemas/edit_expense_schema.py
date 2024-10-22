from pydantic import BaseModel
from typing import Optional
from datetime import date

class editExpenseModel(BaseModel):
    editcategory: Optional[ str ] = None
    editdescription: Optional[ str ] = None
    editamount: Optional[ float ] = None
    editdate: Optional[ date ] = None 
 
    class Config:
        from_attributes = True 
        
