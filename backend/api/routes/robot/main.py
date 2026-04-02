from fastapi import APIRouter, Depends
from ...dependencies.database.database import get_db
from ...dependencies.database.dbSchemas import Robot
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import BaseModel

# Define a Pydantic model for the user response since the ORM model cannot be directly serialized to JSON
class RobotResponse(BaseModel):

    id: int
    robot_name: str
    status: str
    battery_percent: int



    class Config:
        from_attributes = True


router = APIRouter()