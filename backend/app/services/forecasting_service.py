"""
Forecasting Service

Generates renewable energy forecasts using
the existing Random Forest solar prediction model.
"""

from app.services.ml_prediction import predict_solar_power


def generate_solar_forecast(
    temperature: float,
    rainfall: float,
    pressure_hpa: float,
    irradiance_g: float,
    irradiance_a: float,
    cloud: float
) -> dict:
    """
    Generate a solar power forecast using the
    existing Random Forest prediction model.
    """

    predicted_power = predict_solar_power(
        temperature=temperature,
        rainfall=rainfall,
        pressure_hpa=pressure_hpa,
        irradiance_g=irradiance_g,
        irradiance_a=irradiance_a,
        cloud=cloud
    )

    # ---------------------------------------------
    # Determine Forecast Status
    # ---------------------------------------------

    if predicted_power >= 3:
        status = "High Generation Potential"

    elif predicted_power >= 1:
        status = "Moderate Generation Potential"

    else:
        status = "Low Generation Potential"

    # ---------------------------------------------
    # Return Forecast
    # ---------------------------------------------

    return {
        "predicted_power": predicted_power,
        "unit": "kW",
        "model": "Random Forest",
        "forecast_type": "Solar Power Forecast",
        "status": status
    }