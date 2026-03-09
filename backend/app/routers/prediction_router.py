from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..schemas import CustomerInput
from ..database import get_db
from .. import crud
from ..services import prediction_service

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("/")
def predict(customers: List[CustomerInput], db: Session = Depends(get_db)):

    customer_dicts = [c.model_dump() for c in customers]

    results = prediction_service.predict_churn(customer_dicts)

    for result in results:
        crud.create_prediction(db, result)

    return results