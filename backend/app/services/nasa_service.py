import requests
from datetime import date, timedelta

BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"


def get_solar_data(latitude: float, longitude: float):
    """
    Fetch recent solar irradiance from NASA POWER API.
    Uses yesterday's date because NASA daily data can have
    a reporting delay.
    """

    target_date = date.today() - timedelta(days=1)
    date_string = target_date.strftime("%Y%m%d")

    params = {
        "parameters": "ALLSKY_SFC_SW_DWN",
        "community": "RE",
        "longitude": longitude,
        "latitude": latitude,
        "start": date_string,
        "end": date_string,
        "format": "JSON"
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    values = data["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"]

    solar = list(values.values())[0]

    return {
        "solar_irradiance": solar
    }