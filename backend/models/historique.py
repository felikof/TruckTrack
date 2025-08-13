from sqlalchemy import Column, Integer, DateTime, Interval
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Historique(Base):
    __tablename__ = "historiques"
    
    id = Column(Integer, primary_key=True, index=True)
    heure_entre = Column(DateTime, nullable=False)
    heure_sortie = Column(DateTime, nullable=False)
    duree = Column(Interval, computed="heure_sortie - heure_entree")
    # camion_id = Column(Integer, ForeignKey("camions.id"))
    # reservation_id = Column(Integer, ForeignKey("reservations.id"))

    # reservations = relationship("Reservation", back_populates="historiques")
    # camions = relationship("Camion", back_populates="historiques")