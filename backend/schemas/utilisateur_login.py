from pydantic import BaseModel

class UtilisateurLogin(BaseModel):
    email: str
    mot_de_passe: str