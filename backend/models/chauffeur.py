from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Chauffeur(Base):
    __tablename__ = "chauffeurs"
    
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    email = Column(String, unique=True)
    telephone = Column(String, nullable=False)
    camion_id = Column(Integer, ForeignKey("camions.id"), nullable=False)
    notification_id = Column(Integer, ForeignKey("notifications.id"), nullable=False)

    camion = relationship("Camion", back_populates="chauffeur", uselist=False)
    notification = relationship("Notification", back_populates="chauffeur", uselist=False)