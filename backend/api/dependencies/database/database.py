from sqlalchemy.orm import sessionmaker
from .configs import Engine

def get_db():
    # Create the Session class
    engine = Engine.get()  # Get the engine instance
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db # This is where the route gets the connection
    finally:
        db.close() # This runs AFTER the route finishes (even if it crashes!)