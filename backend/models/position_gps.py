from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class PositionGPS(Base):
    __tablename__ = "positions_gps"
    
    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(float, nullable=False)
    longitude = Column(float, nullable=False)
    timestamp = Column(DateTime)
    # camion_id = Column(Integer, ForeignKey("camions.id"))

    # camion = relationship("Camion", back_populates="positions_gps", uselist=False)