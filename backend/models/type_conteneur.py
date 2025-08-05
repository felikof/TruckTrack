from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class TypeConteneur(Base):
    __tablename__ = "type_conteneurs"
    
    num = Column(String, primary_key=True, index=True)
    type = Column(String, nullable=False)
    capacite = Column(Integer, nullable=False)
    marchandise_id = Column(Integer, ForeignKey("marchandises.id"), nullable=False)
    declaration_num = Column(String, ForeignKey("declarations.num"), nullable=False)

    declarations = relationship("Declaration", back_populates="type_conteneur", uselist=False)
    marchandise = relationship("Marchandise", back_populates="type_conteneur")