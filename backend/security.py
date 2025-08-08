from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hasher(mdp: str):
    return pwd_context.hash(mdp)

def verifier_mdp(plain_mdp: str, hashed_mdp: str):
    return pwd_context.verify(plain_mdp, hashed_mdp)

