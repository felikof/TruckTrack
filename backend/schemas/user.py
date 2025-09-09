from pydantic import BaseModel, EmailStr

class CreateUser(BaseModel):
    name: str
    first_name: str
    email: EmailStr
    password: str
