from sqlalchemy import Table, Column, Integer, ForeignKey
from database import Base

reservation_creneau = Table(
    "reservation_creneau",
    Base.metadata,
    Column("reservation_id", Integer, ForeignKey("reservations.id"), primary_key=True),
    Column("creneau_id", Integer, ForeignKey("creneaux.id"), primary_key=True)
)
