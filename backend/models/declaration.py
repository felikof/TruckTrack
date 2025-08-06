from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Declaration(Base):
    __tablename__ = "declarations"
    
    num = Column(String, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    description = Column(String, nullable=False)
    marchandise_id = Column(Integer, ForeignKey("marchandises.id"), nullable=False)
    type_conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=False)
    transitaire_id = Column(Integer, ForeignKey("transitaires.id"), nullable=False)

    marchandises = relationship("Marchandise", back_populates="declarations")
    type_conteneurs = relationship("TypeConteneur", back_populates="declarations")
    transitaire = relationship("Transitaire", back_populates="declarations", uselist=False)