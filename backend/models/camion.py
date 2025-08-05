from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Camion(Base):
    __tablename__ = "camions"
    
    id = Column(Integer, primary_key=True, index=True)
    marque = Column(String, nullable=False)
    type = Column(String, nullable=False)
    immatriculation = Column(String, unique=True, index=True, nullable=False)
    capacite = Column(Integer, nullable=False)
    type_conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=False)

    type_conteneur = relationship("TypeConteneur", back_populates="camions")