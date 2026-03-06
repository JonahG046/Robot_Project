from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

# connect to database


# Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# .venv/Scripts/activate
# cd backend -> api
# fastapi dev main.py   


@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {"X-Web-Framework": "FastAPI", "Content-Language": "en-US", "Content-Type": "application/json"}
    return JSONResponse(content=content, headers=headers)

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





