import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).parent

model = joblib.load(BASE_DIR / "churn_model.pkl")
preprocessor = joblib.load(BASE_DIR / "preprocessor.pkl")

sample = pd.read_csv(BASE_DIR / "../../data/WA_Fn-UseC_-Telco-Customer-Churn.csv").head(5)

pred = model.predict_proba(sample.drop("Churn", axis=1))[:, 1]

print(pred)