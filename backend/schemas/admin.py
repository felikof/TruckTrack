from pydantic import BaseModel, EmailStr

class AdminCreate(BaseModel):
    badge_number: str
    nom: str
    prenom: str
    email: EmailStr
    mot_de_passe: str