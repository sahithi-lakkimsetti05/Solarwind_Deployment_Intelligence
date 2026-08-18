import requests


BASE_URL = "https://api.open-meteo.com/v1/forecast"


def get_live_weather(latitude: float, longitude: float):
    """
    Fetch current environmental conditions and
    daily solar radiation from Open-Meteo.
    """

    params = {

        "latitude": latitude,

        "longitude": longitude,

        # ----------------------------------------------------
        # Current environmental conditions
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Daily solar resource
        # ----------------------------------------------------

        "daily": ",".join([
            "shortwave_radiation_sum"
        ]),

        # Forecast period
        "forecast_days": 1,

        # Solar panel configuration
        "tilt": 30,
        "azimuth": 0,

        # Required for daily data
        "timezone": "auto"
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    current = data.get(
        "current",
        {}
    )

    daily = data.get(
        "daily",
        {}
    )

    # --------------------------------------------------------
    # Extract daily solar radiation
    # --------------------------------------------------------

    radiation_values = daily.get(
        "shortwave_radiation_sum",
        []
    )

    daily_radiation = None

    if radiation_values:
        daily_radiation = radiation_values[0]

    # --------------------------------------------------------
    # Return environmental information
    # --------------------------------------------------------

    return {

        "temperature":
            current.get("temperature_2m"),

        "humidity":
            current.get("relative_humidity_2m"),

        "wind_speed":
            current.get("wind_speed_10m"),

        "air_pressure":
            current.get("surface_pressure"),

        "rainfall":
            current.get("precipitation"),

        "cloud": (
            current.get("cloud_cover", 0) / 100
            if current.get("cloud_cover") is not None
            else 0
        ),

        # Current solar irradiance
        "irradiance_g":
            current.get("shortwave_radiation"),

        # Current tilted irradiance
        "irradiance_a":
            current.get("global_tilted_irradiance"),

        # Daily solar radiation
        "daily_radiation":
            daily_radiation
    }