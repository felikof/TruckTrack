from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Marchandise(Base):
    __tablename__ = "marchandises"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    poids = Column(Integer)
    volume = Column(Integer)
    # declaration_num = Column(String, ForeignKey("declarations.num"))
    # conteneur_num = Column(String, ForeignKey("type_conteneurs.num"))