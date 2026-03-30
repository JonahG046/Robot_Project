from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .routes.users import main  # Import the module
from .routes.robot import main  # Import the robot module
from .dependencies.database.dbSchemas import create_tables


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

# Create tables at startup (Engine is singleton and will be initialized on first call)
create_tables()

# Learn how to return json data
app.include_router(main.router)  # Register it

@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {"X-Web-Framework": "FastAPI", "Content-Language": "en-US", "Content-Type": "application/json"}
    response = JSONResponse(content=content, headers=headers)

    return response

