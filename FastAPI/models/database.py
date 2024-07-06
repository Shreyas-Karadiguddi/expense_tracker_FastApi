from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from models.config import username,password
 
engine = create_engine(f"postgresql://{username}:{password}@localhost/expense_tracker",echo= True)


 
Base = declarative_base()

Session = sessionmaker()

