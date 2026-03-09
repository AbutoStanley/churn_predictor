from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import crud

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("/")
def get_all_predictions(db: Session = Depends(get_db)):

    return crud.get_predictions(db)


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    return crud.get_prediction_summary(db)