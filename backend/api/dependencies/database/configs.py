import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

SECRET_PW = os.getenv("SECRET_PW")
DATABASE_URL = os.getenv("DATABASE_URL")

# 1. Define your Database URL
DB_USER = "postgres"
DB_PASSWORD = SECRET_PW
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "robot"

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# 2. Singleton Engine class - ensures only one engine instance exists
class Engine:
    _instance = None

    @classmethod
    def get(cls):
        """Get or create the engine instance. Only runs once."""
        if cls._instance is None:
            cls._instance = create_engine(SQLALCHEMY_DATABASE_URL)
        return cls._instance

