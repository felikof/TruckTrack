from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Carrier(Base):
    __tablename__ = "carrier"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    adress = Column(String, nullable=False)
    notification_id = Column(Integer, ForeignKey("notifications.id"))

    reservation = relationship("Reservation", back_populates="carrier")
    driver = relationship("Driver", back_populates="carrier")
    truck = relationship("Truck", back_populates="carrier")
    notification = relationship("Notification", back_populates="carrier")