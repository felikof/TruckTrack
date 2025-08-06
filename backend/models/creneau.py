from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Creneau(Base):
    __tablename__ = "creneaux"
    
    id = Column(Integer, primary_key=True, index=True)
    heure_debut = Column(DateTime, nullable=False)
    heure_fin = Column(DateTime, nullable=False)
    statut = Column(String, nullable=False)
    reservation_id = Column(Integer, ForeignKey("reservations.id"), nullable=False)
    alerte_id = Column(Integer, ForeignKey("alertes.id"), nullable=True)

    alerte = relationship("Alerte", back_populates="creneaux", uselist=False)
    reservations = relationship("Reservation", back_populates="creneaux")