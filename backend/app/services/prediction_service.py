import joblib
import pandas as pd
from pathlib import Path
from fastapi import HTTPException

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
PIPELINE_PATH = BASE_DIR / "model" / "churn_model.pkl"

# Load model once at startup
pipeline = joblib.load(PIPELINE_PATH)


def predict_churn(customers: list):

    try:

        df = pd.DataFrame(customers)

        probabilities = pipeline.predict_proba(df)[:, 1]

        results = []

        for i, prob in enumerate(probabilities):

            churn_prediction = bool(prob > 0.5)

            if prob < 0.3:
                risk = "low"
            elif prob < 0.6:
                risk = "medium"
            else:
                risk = "high"

            results.append({
                "customer_index": i,
                "churn_probability": float(prob),
                "churn_prediction": churn_prediction,
                "risk_level": risk
            })

        return results

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))