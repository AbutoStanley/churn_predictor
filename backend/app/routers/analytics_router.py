from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from .. import models

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    total = db.query(models.Prediction).count()

    churned = db.query(models.Prediction)\
        .filter(models.Prediction.churn_prediction == True)\
        .count()

    churn_rate = (churned / total * 100) if total > 0 else 0

    return {
        "total_predictions": total,
        "churned_customers": churned,
        "churn_rate": round(churn_rate, 2)
    }


@router.get("/risk-distribution")
def risk_distribution(db: Session = Depends(get_db)):

    data = db.query(
        models.Prediction.risk_level,
        func.count(models.Prediction.id)
    ).group_by(models.Prediction.risk_level).all()

    return [{"risk_level": r, "count": c} for r, c in data]


@router.get("/probability-distribution")
def probability_distribution(db: Session = Depends(get_db)):

    data = db.query(models.Prediction.churn_probability).all()

    return [p[0] for p in data]


@router.get("/predictions")
def get_predictions(db: Session = Depends(get_db)):

    predictions = db.query(models.Prediction)\
        .order_by(models.Prediction.created_at.desc())\
        .limit(200)\
        .all()

    return predictions