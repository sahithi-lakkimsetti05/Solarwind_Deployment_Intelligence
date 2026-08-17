import joblib
import pandas as pd
from pathlib import Path


# ============================================================
# Locate project root
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[3]

MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "solar_random_forest.pkl"
)


# ============================================================
# Load model once
# ============================================================

model = joblib.load(MODEL_PATH)


# ============================================================
# Calculate Air Density
# ============================================================

def calculate_air_density(
    temperature: float,
    pressure_hpa: float
) -> float:
    """
    Calculate air density (Rhoa) in kg/m³.

    temperature: Celsius
    pressure_hpa: atmospheric pressure in hPa
    """

    temperature_kelvin = temperature + 273.15

    pressure_pa = pressure_hpa * 100

    gas_constant = 287.05

    density = pressure_pa / (
        gas_constant * temperature_kelvin
    )

    return round(density, 3)


# ============================================================
# Solar Power Prediction
# ============================================================

def predict_solar_power(
    temperature,
    rainfall,
    pressure_hpa,
    irradiance_g,
    irradiance_a,
    cloud,
):
    """
    Predict solar power using the trained
    Random Forest model.
    """

    # Calculate Rhoa correctly
    rhoa = calculate_air_density(
        temperature,
        pressure_hpa
    )

    data = pd.DataFrame(
        [{
            "Temperature": temperature,
            "Prectotland": rainfall,
            "Rhoa": rhoa,
            "Irradiance (G)": irradiance_g,
            "Irradiance (A)": irradiance_a,
            "Cloud": cloud,
        }]
    )

    prediction = model.predict(data)[0]

    return round(float(prediction), 2)