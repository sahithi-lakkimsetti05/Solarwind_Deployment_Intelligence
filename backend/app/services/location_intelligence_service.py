import requests

from app.services.weather_service import get_live_weather
from app.services.site_intelligence_service import (
    get_suitability_label,
    get_deployment_priority,
)


GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"


# ============================================================
# GEOCODE PLACE
# ============================================================

def geocode_place(place: str) -> dict:

    if not place or not place.strip():
        raise ValueError("Place name is required.")

    params = {
        "name": place.strip(),
        "count": 1,
        "language": "en",
        "format": "json",
    }

    response = requests.get(
        GEOCODING_URL,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    results = data.get("results", [])

    if not results:
        raise ValueError(
            f"Unable to find location: {place}"
        )

    location = results[0]

    return {
        "name": location.get("name"),
        "latitude": location.get("latitude"),
        "longitude": location.get("longitude"),
        "country": location.get("country"),
        "country_code": location.get("country_code"),
        "admin1": location.get("admin1"),
    }


# ============================================================
# SOLAR RESOURCE SCORE
# ============================================================

def calculate_location_solar_score(
    daily_solar_radiation: float
) -> int:
    """
    Calculate realistic solar resource suitability.

    Daily solar radiation is measured in MJ/m²/day.

    Score:
        >= 6.5  -> 90
        >= 5.5  -> 85
        >= 4.5  -> 78
        >= 3.5  -> 68
        >= 2.5  -> 55
        >= 1.5  -> 40
        < 1.5   -> 25
    """

    if daily_solar_radiation is None:
        return 0

    radiation = float(daily_solar_radiation)

    if radiation >= 6.5:
        return 90

    elif radiation >= 5.5:
        return 85

    elif radiation >= 4.5:
        return 78

    elif radiation >= 3.5:
        return 68

    elif radiation >= 2.5:
        return 55

    elif radiation >= 1.5:
        return 40

    else:
        return 25


# ============================================================
# WIND RESOURCE SCORE
# ============================================================

def calculate_location_wind_score(
    wind_speed: float
) -> int:
    """
    Calculate realistic wind resource suitability.

    Wind speed is measured in m/s.

    Score:
        >= 15  -> 92
        >= 12  -> 88
        >= 10  -> 82
        >= 8   -> 72
        >= 6   -> 60
        >= 4   -> 45
        >= 3   -> 30
        < 3    -> 20
    """

    if wind_speed is None:
        return 0

    wind_speed = float(wind_speed)

    if wind_speed >= 15:
        return 92

    elif wind_speed >= 12:
        return 88

    elif wind_speed >= 10:
        return 82

    elif wind_speed >= 8:
        return 72

    elif wind_speed >= 6:
        return 60

    elif wind_speed >= 4:
        return 45

    elif wind_speed >= 3:
        return 30

    else:
        return 20


# ============================================================
# RESOURCE CLASSIFICATION
# ============================================================

def classify_resource(score: int) -> str:

    if score >= 85:
        return "Excellent"

    elif score >= 70:
        return "Good"

    elif score >= 50:
        return "Moderate"

    elif score >= 30:
        return "Low"

    else:
        return "Very Low"


# ============================================================
# LOCATION INTELLIGENCE
# ============================================================

def generate_location_intelligence(
    place: str
) -> dict:

    # --------------------------------------------------------
    # 1. Find coordinates
    # --------------------------------------------------------

    location = geocode_place(place)

    latitude = location["latitude"]
    longitude = location["longitude"]

    if latitude is None or longitude is None:
        raise ValueError(
            "Unable to determine coordinates for this location."
        )

    # --------------------------------------------------------
    # 2. Fetch environmental conditions
    # --------------------------------------------------------

    weather = get_live_weather(
        latitude,
        longitude
    )

    # --------------------------------------------------------
    # 3. Extract environmental data
    # --------------------------------------------------------

    daily_solar_radiation = weather.get(
        "daily_radiation"
    )

    current_irradiance = weather.get(
        "irradiance_g"
    )

    wind_speed = weather.get(
        "wind_speed"
    )

    temperature = weather.get(
        "temperature"
    )

    humidity = weather.get(
        "humidity"
    )

    rainfall = weather.get(
        "rainfall"
    )

    air_pressure = weather.get(
        "air_pressure"
    )

    cloud = weather.get(
        "cloud"
    )

    # --------------------------------------------------------
    # 4. Validate resource data
    # --------------------------------------------------------

    if daily_solar_radiation is None:
        raise ValueError(
            "Solar radiation data is unavailable for this location."
        )

    if wind_speed is None:
        raise ValueError(
            "Wind speed data is unavailable for this location."
        )

    # --------------------------------------------------------
    # 5. Calculate solar suitability
    # --------------------------------------------------------

    solar_score = calculate_location_solar_score(
        daily_solar_radiation
    )

    solar_class = classify_resource(
        solar_score
    )

    # --------------------------------------------------------
    # 6. Calculate wind suitability
    # --------------------------------------------------------

    wind_score = calculate_location_wind_score(
        wind_speed
    )

    wind_class = classify_resource(
        wind_score
    )

    # --------------------------------------------------------
    # 7. Overall renewable suitability
    # --------------------------------------------------------

    overall_score = round(
        (solar_score + wind_score) / 2
    )

    suitability = get_suitability_label(
        overall_score
    )

    deployment_priority = get_deployment_priority(
        overall_score
    )

    # --------------------------------------------------------
    # 8. Determine best renewable source
    # --------------------------------------------------------

    if solar_score > wind_score:

        best_source = "Solar"

        recommendation = (
            "Solar energy is recommended because "
            "the location demonstrates stronger "
            "solar resource potential than wind."
        )

    elif wind_score > solar_score:

        best_source = "Wind"

        recommendation = (
            "Wind energy is recommended because "
            "the location demonstrates stronger "
            "wind resource potential than solar."
        )

    else:

        best_source = "Solar + Wind"

        recommendation = (
            "Both solar and wind resources show "
            "similar potential. A hybrid renewable "
            "deployment strategy may be considered."
        )

    # --------------------------------------------------------
    # 9. Final result
    # --------------------------------------------------------

    return {

        "location": location,

        "coordinates": {
            "latitude": latitude,
            "longitude": longitude
        },

        # ====================================================
        # SOLAR RESOURCE
        # ====================================================

        "solar_resource": {

            "daily_radiation": round(
                float(daily_solar_radiation), 2
            ),

            "daily_radiation_unit": "MJ/m²/day",

            "current_irradiance": (
                round(float(current_irradiance), 2)
                if current_irradiance is not None
                else None
            ),

            "current_irradiance_unit": "W/m²",

            "score": solar_score,

            "classification": solar_class
        },

        # ====================================================
        # WIND RESOURCE
        # ====================================================

        "wind_resource": {

            "wind_speed": round(
                float(wind_speed), 2
            ),

            "unit": "m/s",

            "score": wind_score,

            "classification": wind_class
        },

        # ====================================================
        # ENVIRONMENT
        # ====================================================

        "environment": {

            "temperature": temperature,

            "humidity": humidity,

            "wind_speed": wind_speed,

            "solar_irradiance": (
                round(float(current_irradiance), 2)
                if current_irradiance is not None
                else None
            ),

            "daily_solar_radiation": (
                round(float(daily_solar_radiation), 2)
                if daily_solar_radiation is not None
                else None
            ),

            "rainfall": rainfall,

            "air_pressure": air_pressure,

            "cloud": cloud
        },

        # ====================================================
        # SITE INTELLIGENCE
        # ====================================================

        "site_intelligence": {

            "solar_score": solar_score,

            "wind_score": wind_score,

            "overall_score": overall_score,

            "suitability": suitability,

            "deployment_priority": deployment_priority,

            "best_energy_source": best_source,

            "recommendation": recommendation
        }
    }