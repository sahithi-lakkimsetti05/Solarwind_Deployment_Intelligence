import joblib
import pandas as pd
from pathlib import Path


# ==========================
# Load Trained Model
# ==========================

MODEL_PATH = Path(__file__).parent / "models" / "solar_random_forest.pkl"

model = joblib.load(MODEL_PATH)


# ==========================
# Feature Names
# ==========================

FEATURES = [
    "Temperature",
    "Prectotland",
    "Rhoa",
    "Irradiance (G)",
    "Irradiance (A)",
    "Cloud"
]


# ==========================
# Prediction Function
# ==========================

def predict_power(
    temperature,
    prectotland,
    rhoa,
    irradiance_g,
    irradiance_a,
    cloud
):
    data = pd.DataFrame([{
        "Temperature": temperature,
        "Prectotland": prectotland,
        "Rhoa": rhoa,
        "Irradiance (G)": irradiance_g,
        "Irradiance (A)": irradiance_a,
        "Cloud": cloud
    }])

    prediction = model.predict(data)

    return float(prediction[0])