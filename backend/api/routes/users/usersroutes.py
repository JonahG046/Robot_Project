from fastapi import APIRouter, Depends, Body
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


router = APIRouter()

# This one needs work. I don't think I implemented it correctly.
@router.get("/users/{user_id}", response_model=UserResponse)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    query = select(Users).where(Users.id == user_id)
    result = db.execute(query).one()
    user = UserResponse.model_validate(result).model_dump()
    
    print(user)
    if not result:
        return {"message": "User not found"}

    return {"message": f"Hello World, User ID: {user.id}, Name: {user.name}"}


@router.get("/users", response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    print("Getting users from database...")
    query = select(Users)
    result = db.execute(query)
    users = result.scalars().all()
    
    # scalers.all returns JSON
    return users
    

   
# Define a POST route for creating a new user
# @router.post('/users', response_model=UserResponse)
# async def post_user(payload: dict = Body(), db: Session = Depends(get_db)):


# # Create query to check if user already exists
#     query = select(Users).where(Users.email == payload.email)
#     existinguser = db.execute(query).scalar_one_or_none()

#     if existinguser == 1:
#         return True
#     else:
#         return False
        #create user

# If user does not exist, create user
# If user does exist, return



#   // Access submitted data using req.body (requires middleware like express.json())
#   const newUser = req.body;
#   console.log('Received new user data:', newUser);
  # Logic to save the user to a database would go here

  # Send a response back to the client
  #res.send('User created successfully with data: ' + JSON.stringify(newUser));


    # return True