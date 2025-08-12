from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Utilisateur(Base):
    __tablename__ = "utilisateurs"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mot_de_passe = Column(String, nullable=False)
    # profil_id = Column(Integer, ForeignKey("profils.id"))
    # notification_id = Column(Integer, ForeignKey("notifications.id"))

    # profil = relationship("Profil", back_populates="utilisateur", uselist=False)
    # notifications = relationship("Notification", back_populates="utilisateur")