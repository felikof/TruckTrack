from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Alerte(Base):
    __tablename__ = "alertes"
    
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    niveau = Column(enumerate(["info", "warning", "high", "critical"]), nullable=False)