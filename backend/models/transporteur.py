from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Transporteur(Base):
    __tablename__ = "transporteurs"
    
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    telephone = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    chauffeur_id = Column(Integer, ForeignKey("chauffeurs.id"), nullable=False)
    camion_id = Column(Integer, ForeignKey("camions.id"), nullable=False)
    notification_id = Column(Integer, ForeignKey("notifications.id"), nullable=False)
    reservation_id = Column(Integer, ForeignKey("reservations.id"), nullable=False)

    reservations = relationship("Reservation", back_populates="transporteur")
    chauffeurs = relationship("Chauffeur", back_populates="transporteur")
    camions = relationship("Camion", back_populates="transporteur")
    notifications = relationship("Notification", back_populates="transporteur")