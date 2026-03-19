from fastapi import APIRouter
router = APIRouter()



 
@router.get("/users")
async def get_users():

    #Pull name, email, location from database
    db_connection = connect()
    cursor = db_connection.cursor()

    cursor.execute('SELECT * FROM users')

    db_version = cursor.fetchone()

    my_user = cursor.fetchall()
        
    print(my_user)

    json_str = json.dumps(my_user)

    cursor.close()

    return json_str

    # content = {"message": "Hello World"}
    # headers = {"X-Web-Framework": "FastAPI", "Content-Language": "en-US", "Content-Type": "application/json"}
    # response = JSONResponse(content=content, headers=headers)

    # return response