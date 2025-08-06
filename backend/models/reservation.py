from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    statut = Column(String, nullable=False)
    transporteur_id = Column(Integer, ForeignKey("transporteurs.id"), nullable=False)
    creneau_id = Column(Integer, ForeignKey("creneaux.id"), nullable=False)
    camion_id = Column(Integer, ForeignKey("camions.id"), nullable=False)
    chauffeur_id = Column(Integer, ForeignKey("chauffeurs.id"), nullable=False)
    conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=False)

    transporteurs = relationship("Transporteur", back_populates="reservations")
    camions = relationship("Camion", back_populates="reservations")
    creneaux = relationship("Creneau", back_populates="reservation")
    chauffeurs = relationship("Chauffeur", back_populates="reservations")
    type_conteneurs = relationship("TypeConteneur", back_populates="reservations")