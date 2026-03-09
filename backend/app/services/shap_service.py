import joblib
import pandas as pd
import shap
from pathlib import Path
from fastapi import HTTPException

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PIPELINE_PATH = BASE_DIR / "model" / "churn_model.pkl"

pipeline = joblib.load(PIPELINE_PATH)

preprocessor = pipeline.named_steps["preprocessor"]
model = pipeline.named_steps["classifier"]

explainer = shap.TreeExplainer(model)


def explain_churn(customers):

    try:

        if isinstance(customers, dict):
            customers = [customers]

        df = pd.DataFrame(customers)

        X_processed = preprocessor.transform(df)

        shap_values = explainer.shap_values(X_processed)

        explanations = []

        for i in range(len(df)):

            feature_impacts = []

            for j, feature in enumerate(df.columns):

                feature_impacts.append({
                    "feature": feature,
                    "impact": float(shap_values[i][j]),
                    "value": str(df.iloc[i][feature])
                })

            feature_impacts.sort(key=lambda x: abs(x["impact"]), reverse=True)

            top_positive = [f for f in feature_impacts if f["impact"] > 0][:3]
            top_negative = [f for f in feature_impacts if f["impact"] < 0][:3]

            explanations.append({
                "customer_index": i,
                "top_positive_drivers": top_positive,
                "top_negative_drivers": top_negative,
                "waterfall_data": feature_impacts[:8]  # top 8 features
            })
            
        return explanations

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))