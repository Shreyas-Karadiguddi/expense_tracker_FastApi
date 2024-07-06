from .database import Base
from sqlalchemy import Column,Integer,String,Boolean,ForeignKey,Text
from sqlalchemy.orm import relationship
from sqlalchemy_utils import ChoiceType

class Login(Base):
    __tablename__ = 'login'

    id = Column(Integer,primary_key=True)
    username = Column(String(20),unique=True)
    password = Column(Text,nullable=False)


    def __repr__(self):
        return f"Username : {self.username}"


