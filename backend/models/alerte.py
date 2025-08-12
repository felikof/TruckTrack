from sqlalchemy import Column, Integer, String, Enum
from database import Base

class Alerte(Base):
    __tablename__ = "alertes"
    
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    niveau = Column(Enum("info", "warning", "high", "critical", name="alerte_niveau"), nullable=False)