import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

SECRET_PW = os.getenv("SECRET_PW")
DATABASE_URL = os.getenv("DATABASE_URL")

# 1. Define your Database URL
SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://postgres:{SECRET_PW}{DATABASE_URL}"
# 2. Singleton Engine class - ensures only one engine instance exists
class Engine:
    _instance = None

    @classmethod
    def get(cls):
        """Get or create the engine instance. Only runs once."""
        if cls._instance is None:
            cls._instance = create_engine(SQLALCHEMY_DATABASE_URL)
        return cls._instance

