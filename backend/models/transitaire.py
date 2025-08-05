from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Transitaire(Base):
    __tablename__ = "transitaires"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    telephone = Column(String, unique=True, index=True, nullable=False)
    declaration_num = Column(String, ForeignKey("declarations.num"), nullable=False)

    declarations = relationship("Declaration", back_populates="transitaire")