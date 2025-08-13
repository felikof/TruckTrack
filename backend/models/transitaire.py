from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Transitaire(Base):
    __tablename__ = "transitaires"

    num_id = Column(String, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    société = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    telephone = Column(String, nullable=False)
    # declaration_num = Column(String, ForeignKey("declarations.num"))

    # declarations = relationship("Declaration", back_populates="transitaire")