from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    statut = Column(String, nullable=False)
    transporteur_id = Column(Integer, ForeignKey("transporteurs.id"))
    camion_id = Column(Integer, ForeignKey("camions.id"))
    chauffeur_id = Column(Integer, ForeignKey("chauffeurs.id"))
    creneau_id = Column(Integer, ForeignKey("creneaux.id"))
    # conteneur_num = Column(String, ForeignKey("type_conteneurs.num"))

    transporteurs = relationship("Transporteur", back_populates="reservations")
    camions = relationship("Camion", back_populates="reservations")
    creneaux = relationship("Creneau", back_populates="reservation", uselist=False)
    chauffeurs = relationship("Chauffeur", back_populates="reservations")
    # type_conteneurs = relationship("TypeConteneur", back_populates="reservations")