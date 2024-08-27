from .database import Base
from sqlalchemy import Column,Integer,String,Boolean,ForeignKey,Text,Float,Date
from sqlalchemy.orm import relationship
from sqlalchemy_utils import ChoiceType

class Expense(Base):
    __tablename__ = 'expense'

    id = Column(Integer,primary_key=True)
    category = Column(String(200))
    description = Column(Text,nullable=False)
    amount = Column(Float)
    date = Column(Date)
    user_id = Column(Integer,ForeignKey("users.id"))

    user = relationship("User",back_populates = "add_expense")

    def __repr__(self):
        return f"Category : {self.category},Amount : {self.amount}"

