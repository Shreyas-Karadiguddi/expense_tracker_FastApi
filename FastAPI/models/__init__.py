from .database import Base,engine
from .user_model import User
from .add_expense import Expense

Base.metadata.create_all(engine)