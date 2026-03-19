from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_PW = os.getenv("SECRET_PW")

# 1. Define your Database URL
# For SQLite (creates a file named 'sql_app.db' in your folder)
SQLALCHEMY_DATABASE_URL = ""
# postgresql+psycopg2://scott:tiger@localhost/mydatabase (reference to how db url should look)

# 2. Create the Engine
# 'check_same_thread' is only needed for SQLite!
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. Create the Session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a Base class for your models to inherit from
Base = declarative_base()

# 1. Create your engine and session factory 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 

# 2. The Dependency 
def get_db(): 
    db = SessionLocal() 
    try: 
        yield db # This is where the route gets the connection 
    finally: 
        db.close() # This runs AFTER the route finishes (even if it crashes!)