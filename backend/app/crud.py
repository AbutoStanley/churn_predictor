from sqlalchemy.orm import Session
from . import models


def create_prediction(db: Session, result: dict):

    db_prediction = models.Prediction(
        customer_index=result["customer_index"],
        churn_probability=result["churn_probability"],
        churn_prediction=result["churn_prediction"],
        risk_level=result["risk_level"]
    )

    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return db_prediction

def get_predictions(db: Session):

    return db.query(models.Prediction).all()


def get_prediction_summary(db: Session):

    total = db.query(models.Prediction).count()

    churned = db.query(models.Prediction)\
        .filter(models.Prediction.churn_prediction == True)\
        .count()

    churn_rate = (churned / total) * 100 if total > 0 else 0

    return {
        "total_predictions": total,
        "churned_customers": churned,
        "churn_rate": churn_rate
    }