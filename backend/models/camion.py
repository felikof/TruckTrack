from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Camion(Base):
    __tablename__ = "camions"
    
    id = Column(Integer, primary_key=True, index=True)
    marque = Column(String, nullable=False)
    type = Column(String, nullable=False)
    immatriculation = Column(String, unique=True, nullable=False)
    capacite = Column(Integer)
    # conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=True)
    # chauffeur_id = Column(Integer, ForeignKey("chauffeurs.id"))
    # transporteur_id = Column(Integer, ForeignKey("transporteurs.id"))
    # reservation_id = Column(Integer, ForeignKey("reservations.id"))
    # even_id = Column(Integer, ForeignKey("even_logistique.id"))
    # position_id = Column(Integer, ForeignKey("positions_gps.id"), nullable=True)
    # trajectoire_id = Column(Integer, ForeignKey("trajectoires_camion.id"))

    # chauffeur = relationship("Chauffeur", back_populates="camions", uselist=False)
    # transporteur = relationship("Transporteur", back_populates="camion", uselist=False)
    # reservations = relationship("Reservation", back_populates="camion")
    # even_logistique = relationship("EvenLogistique", back_populates="camion")
    # position_gps = relationship("PositionGPS", back_populates="camion", uselist=False)
    # trajectoire = relationship("TrajectoireCamion", back_populates="camion", uselist=False)
    # type_conteneurs = relationship("TypeConteneur", back_populates="camions")