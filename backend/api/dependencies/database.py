from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os
from dotenv import load_dotenv


load_dotenv()

SECRET_PW = os.getenv("SECRET_PW")

# 1. Define your Database URL
SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://postgres:{SECRET_PW}@localhost/robot"

# 2. Create the Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

# 3. Create the Session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a Base class for your models to inherit from
class Base(DeclarativeBase): 
    pass

# 5. The Dependency 
def get_db(): 
    db = SessionLocal() 
    try: 
        yield db # This is where the route gets the connection 
    finally: 
        db.close() # This runs AFTER the route finishes (even if it crashes!)