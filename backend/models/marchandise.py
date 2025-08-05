from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Marchandise(Base):
    __tablename__ = "marchandises"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    poids = Column(Integer, nullable=False)
    volume = Column(Integer, nullable=False)
    declaration_num = Column(String, ForeignKey("declarations.num"), nullable=False)
    type_conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=False)

    type_conteneur = relationship("TypeConteneur", back_populates="marchandise", uselist=False)
    declarations = relationship("Declaration", back_populates="marchandise", uselist=False)