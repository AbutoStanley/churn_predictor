from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime
from datetime import datetime, timezone
from .database import Base


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    customer_index = Column(Integer)

    churn_probability = Column(Float)

    churn_prediction = Column(Boolean)

    risk_level = Column(String)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))