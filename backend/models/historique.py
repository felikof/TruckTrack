from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Historique(Base):
    __tablename__ = "historiques"
    
    id = Column(Integer, primary_key=True, index=True)
    heure_entre = Column(DateTime, nullable=False)
    heure_sortie = Column(DateTime, nullable=False)
    reservation_id = Column(Integer, ForeignKey("reservations.id"), nullable=False)

    reservations = relationship("Reservation", back_populates="historiques")