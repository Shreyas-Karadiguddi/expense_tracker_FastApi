from .database import Base,engine
from .user_model import User
from .add_expense_model import Expense

Base.metadata.create_all(engine)