from sqlalchemy import Table, Column, Integer, ForeignKey
from database import Base

slot_reservation = Table(
    "slot_reservation",
    Base.metadata,
    Column("reservation_id", Integer, ForeignKey("reservations.id"), primary_key=True),
    Column("creneau_id", Integer, ForeignKey("creneaux.id"), primary_key=True)
)
