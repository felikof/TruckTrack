from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from database import Base

class Truck(Base):
    __tablename__ = "truck"
    
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, nullable=False)
    type = Column(String, nullable=False)
    immatriculation = Column(String, unique=True, nullable=False)
    capacity = Column(Integer)
    # conteneur_num = Column(String, ForeignKey("type_conteneurs.num"), nullable=True)
    driver_id = Column(Integer, ForeignKey("driver.id"), unique=True)
    carrier_id = Column(Integer, ForeignKey("carrier.id"))
    reservation_id = Column(Integer, ForeignKey("reservations.id"))
    # even_id = Column(Integer, ForeignKey("even_logistique.id"))
    # position_id = Column(Integer, ForeignKey("positions_gps.id"), nullable=True)
    # trajectoire_id = Column(Integer, ForeignKey("trajectoires_camion.id"))