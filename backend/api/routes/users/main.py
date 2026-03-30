from fastapi import APIRouter, Depends, HTTPException
from ...dependencies.database.database import get_db
from ...dependencies.database.dbSchemas import Users
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import BaseModel

# Define a Pydantic model for the user response since the ORM model cannot be directly serialized to JSON
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    location: str

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    email: str
    location: str


router = APIRouter()

# This one needs work. I don't think I implemented it correctly.
@router.get("/user/{user_id}", response_model=list[UserResponse])
async def read_user(user_id: int, db: Session = Depends(get_db)):
    query = select(Users).where(Users.id == user_id)
    result = db.execute(query).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": f"User ID: {result.id}, Name: {result.name}"}


@router.get("/users", response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    print("Getting users from database...")

    query = select(Users)
    result = db.execute(query)
    users = result.scalars().all()

    return users


@router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if a user with this email already exists
    query = select(Users).where(Users.email == user.email)
    existing_user = db.execute(query).scalar_one_or_none()

    if existing_user:
        # Raise an HTTP 400 error if the user already exists
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # If not, create the new user
    new_user = Users(
        name=user.name,
        email=user.email,
        location=user.location
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # refresh to get the auto-generated id

    return new_user