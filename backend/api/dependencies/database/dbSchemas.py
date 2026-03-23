from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String
from .configs import Engine

# 1. Create a Base class for your models to inherit from
class Base(DeclarativeBase):
    pass

# 2. Define your models
class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    location = Column(String)

# 3. Create tables
def create_tables():
    # Create all database tables at startup.
    engine = Engine.get()
    Base.metadata.create_all(bind=engine)