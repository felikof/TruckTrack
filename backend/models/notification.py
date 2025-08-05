from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    canal = Column(String, nullable=False)
    contenu = Column(String, nullable=False)

    utilisateur = relationship("Utilisateur", back_populates="notifications", uselist=False)
