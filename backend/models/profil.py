from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Profil(Base):
    __tablename__ = "profils"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, nullable=False)
    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"), nullable=False)

    utilisateurs = relationship("Utilisateur", back_populates="profil")
