from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Transporteur(Base):
    __tablename__ = "transporteurs"
    
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    telephone = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    notification_id = Column(Integer, ForeignKey("notifications.id"))

    reservations = relationship("Reservation", back_populates="transporteur")
    chauffeurs = relationship("Chauffeur", back_populates="transporteur")
    camions = relationship("Camion", back_populates="transporteur")
    notifications = relationship("Notification", back_populates="transporteur")