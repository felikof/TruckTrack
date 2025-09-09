from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Reservation(Base):
    __tablename__ = "reservation"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    statut = Column(String, nullable=False)
    carrier_id = Column(Integer, ForeignKey("carrier.id"))
    truck_id = Column(Integer, ForeignKey("truck.id"))
    driver_id = Column(Integer, ForeignKey("driver.id"))
    slot_id = Column(Integer, ForeignKey("slot.id"))
    # conteneur_num = Column(String, ForeignKey("type_conteneurs.num"))

    slot = relationship("Slot", back_populates="reservation", uselist=False)