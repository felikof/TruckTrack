from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models.admin import Admin
from user import User, Base
from backend.schemas.user_login import UserLogin
from schemas.admin import CreateAdmin
from backend.schemas.user import CreateUser
from security import hasher, verifier_mdp
from fastapi.middleware.cors import CORSMiddleware
        
Base.metadata.create_all(bind=engine)

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

@app.post("/users/sign")
def user_registration(user: CreateUser, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    new_user = User(
        name=user.name,
        first_name=user.first_name,
        email=user.email,
        password=hasher(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Inscription réussie", "id": new_user.id}

@app.post("/users/login")
def user_login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if not verifier_mdp(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return {"message": "Connexion réussie", "id": db_user.id, "nom": db_user.name}


@app.post("/admins/sign")
def admin_registration(admin: CreateAdmin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    new_admin = Admin(
        badge_number=admin.badge_number,
        name=admin.name,
        first_name=admin.first_name,
        email=admin.email,
        password=hasher(admin.password)
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return {"message": "Inscription admin réussie", "id": new_admin.id}

@app.post("/admins/login")
def admin_login(admin: UserLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin non trouvé")

    if not verifier_mdp(admin.password, db_admin.password):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return {"message": "Connexion admin réussie", "id": db_admin.id, "nom": db_admin.nom}