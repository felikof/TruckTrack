from pydantic import BaseModel, EmailStr

class CreateAdmin(BaseModel):
    badge_number: str
    name: str
    first_name: str
    email: EmailStr
    password: str