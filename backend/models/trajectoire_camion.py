from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class TrajectoireCamion(Base):
    __tablename__ = "trajectoires_camion"

    id = Column(Integer, primary_key=True, index=True)
    chemin = Column(String, nullable=False)
    camion_id = Column(Integer, ForeignKey("camions.id"), nullable=False)

    camion = relationship("Camion", back_populates="trajectoires", uselist=False)
    