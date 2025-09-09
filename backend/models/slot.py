from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Slot(Base):
    __tablename__ = "slot"
    
    id = Column(Integer, primary_key=True, index=True)
    heure_debut = Column(DateTime, nullable=False)
    heure_fin = Column(DateTime, nullable=False)
    statut = Column(String, nullable=False)
    # alerte_id = Column(Integer, ForeignKey("alertes.id"))

    reservation = relationship("Reservation", back_populates="slot")