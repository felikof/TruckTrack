from pydantic import BaseModel, EmailStr

class UtilisateurCreate(BaseModel):
    nom: str
    email: EmailStr
    mot_de_passe: str
