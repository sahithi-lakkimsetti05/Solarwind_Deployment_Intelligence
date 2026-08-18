import requests


BASE_URL = "https://api.open-meteo.com/v1/forecast"


def get_live_weather(latitude: float, longitude: float):
    """
    Fetch current weather and solar radiation from Open-Meteo.
    """

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "surface_pressure",
            "precipitation",
            "cloud_cover",
            "shortwave_radiation",
            "global_tilted_irradiance"
        ]),

        # Assumed solar-panel configuration.
        # 30° tilt, south-facing.
        "tilt": 30,
        "azimuth": 0
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    current = data.get("current", {})

    return {
        "temperature": current.get("temperature_2m"),
        "humidity": current.get("relative_humidity_2m"),
        "wind_speed": current.get("wind_speed_10m"),
        "air_pressure": current.get("surface_pressure"),
        "rainfall": current.get("precipitation"),

        # Convert Open-Meteo percentage to model's 0-1 fraction.
        "cloud": (
            current.get("cloud_cover", 0) / 100
            if current.get("cloud_cover") is not None
            else 0
        ),

        # Global Horizontal Irradiance
        "irradiance_g": current.get("shortwave_radiation"),

        # Global Tilted Irradiance
        "irradiance_a": current.get("global_tilted_irradiance")
    }