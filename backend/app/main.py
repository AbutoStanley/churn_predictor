from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import prediction_router, analytics_router
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"
                   "https://churn-predictor-2-19zc.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router.router)
app.include_router(analytics_router.router)