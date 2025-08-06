from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class EvenLogistique(Base):
    __tablename__ = "even_logistique"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    description = Column(String, nullable=True)
    date = Column(DateTime, nullable=False)
    lieu = Column(String, nullable=False)
    statut = Column(String, nullable=False)
    camion_id = Column(Integer, ForeignKey("camions.id"), nullable=False)

    camion = relationship("Camion", back_populates="even_logistique", uselist=False)