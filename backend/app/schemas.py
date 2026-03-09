from pydantic import BaseModel

class CustomerInput(BaseModel):

    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

class PredictionCreate(BaseModel):

    churn_probability: float
    churn_prediction: bool
    risk_level: str


class PredictionResponse(PredictionCreate):

    id: int

    class Config:
        orm_mode = True