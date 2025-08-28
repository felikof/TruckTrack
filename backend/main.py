from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import utilisateur as models
from models import admin as models
from schemas import utilisateur as schemas
from schemas.utilisateur_login import UtilisateurLogin
from schemas import admin as schemas
from security import hasher, verifier_mdp
from fastapi.middleware.cors import CORSMiddleware
        
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS pour autoriser React à faire les appels
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tu peux restreindre ça à ["http://localhost:5173"] par ex.
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Dépendance pour récupérer la session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/utilisateurs/inscription")
def inscrire_utilisateur(user: schemas.UtilisateurCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.Utilisateur).filter(models.Utilisateur.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    nouvel_utilisateur = models.Utilisateur(
        nom=user.nom,
        prenom=user.prenom,
        email=user.email,
        mot_de_passe=hasher(user.mot_de_passe)
    )
    db.add(nouvel_utilisateur)
    db.commit()
    db.refresh(nouvel_utilisateur)
    return {"message": "Inscription réussie", "id": nouvel_utilisateur.id}

@app.post("/utilisateurs/connexion")
def connexion_utilisateur(user: UtilisateurLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.Utilisateur).filter(models.Utilisateur.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if not verifier_mdp(user.mot_de_passe, db_user.mot_de_passe):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return {"message": "Connexion réussie", "id": db_user.id, "nom": db_user.nom}

@app.post("/admins/inscription")
def inscrire_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    db_admin = db.query(models.Admin).filter(models.Admin.email == admin.email).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    nouvel_admin = models.Admin(
        badge_number=admin.badge_number,
        nom=admin.nom,
        prenom=admin.prenom,
        email=admin.email,
        mot_de_passe=hasher(admin.mot_de_passe)
    )
    db.add(nouvel_admin)
    db.commit()
    db.refresh(nouvel_admin)
    return {"message": "Inscription admin réussie", "id": nouvel_admin.id}

@app.post("/admins/connexion")
def connexion_admin(admin: UtilisateurLogin, db: Session = Depends(get_db)):
    db_admin = db.query(models.Admin).filter(models.Admin.email == admin.email).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin non trouvé")

    if not verifier_mdp(admin.mot_de_passe, db_admin.mot_de_passe):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return {"message": "Connexion admin réussie", "id": db_admin.id, "nom": db_admin.nom}