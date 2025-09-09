from sqlalchemy import Column, Integer, String, Enum
from database import Base

class Alert(Base):
    __tablename__ = "alert"
    
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    level = Column(Enum("info", "warning", "high", "critical", name="alert_level"), nullable=False)