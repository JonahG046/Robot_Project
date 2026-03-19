from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .dbconnection import connect
#from routes.users import create  # Import the module

app = FastAPI()

# CORS configuration
# In production, you should specify the allowed origins more securely
origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connect to database
db_connection = connect()

#learn how to return json data


#@app.include_router(users.router)  # Register it

@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {"X-Web-Framework": "FastAPI", "Content-Language": "en-US", "Content-Type": "application/json"}
    response = JSONResponse(content=content, headers=headers)

    return response

# @app.get("/profile")
# async def root():

#     #Pull name, email, location from database


#     return {"name": "John Smith",
#             "email": "john.smith@mnsu.edu",
#             "location": "B152"}

# @app.get("/account")
# async def root():
#     return {"name": "John Smith",
#             "email": "john.smith@mnsu.edu",
#             "location": "B152"}





