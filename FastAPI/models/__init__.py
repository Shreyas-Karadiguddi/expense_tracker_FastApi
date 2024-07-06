from .database import Base,engine
from .login_model import Login

Base.metadata.create_all(engine)