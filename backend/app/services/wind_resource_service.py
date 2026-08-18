"""
Wind Resource Estimation Service

Provides wind resource classification and suitability
assessment using environmental wind measurements.
"""


def calculate_wind_resource_score(wind_speed: float) -> int:
    """
    Calculate wind resource score from wind speed.

    Wind speed is measured in m/s.

    Score:
        < 3       -> Very Low
        3 - <5    -> Low
        5 - <7    -> Moderate
        7 - <9    -> Good
        9 - <12   -> Very Good
        >= 12     -> Excellent
    """

    if wind_speed is None:
        return 0

    if wind_speed < 3:
        return 20

    elif wind_speed < 5:
        return 35

    elif wind_speed < 7:
        return 50

    elif wind_speed < 9:
        return 70

    elif wind_speed < 12:
        return 85

    else:
        return 100


def classify_wind_resource(wind_speed: float) -> str:
    """
    Classify wind resource based on wind speed.
    """

    if wind_speed is None:
        return "Unknown"

    if wind_speed < 3:
        return "Very Low"

    elif wind_speed < 5:
        return "Low"

    elif wind_speed < 7:
        return "Moderate"

    elif wind_speed < 9:
        return "Good"

    elif wind_speed < 12:
        return "Very Good"

    else:
        return "Excellent"


def get_wind_resource_level(score: int) -> str:
    """
    Convert wind score into a resource level.
    """

    if score >= 85:
        return "High"

    elif score >= 70:
        return "Good"

    elif score >= 50:
        return "Moderate"

    else:
        return "Low"


def generate_wind_recommendation(
    wind_speed: float,
    score: int
) -> str:
    """
    Generate a deployment recommendation based
    on wind resource conditions.
    """

    if score >= 85:
        return (
            f"Excellent wind resource with an average "
            f"wind speed of {wind_speed} m/s. "
            "The site is highly suitable for wind energy deployment."
        )

    elif score >= 70:
        return (
            f"Good wind resource with an average "
            f"wind speed of {wind_speed} m/s. "
            "The site is suitable for wind energy deployment."
        )

    elif score >= 50:
        return (
            f"Moderate wind resource with an average "
            f"wind speed of {wind_speed} m/s. "
            "Further assessment is recommended before deployment."
        )

    else:
        return (
            f"Low wind resource with an average "
            f"wind speed of {wind_speed} m/s. "
            "The site has limited wind energy potential."
        )


def estimate_wind_resource(wind_speed: float) -> dict:
    """
    Complete wind resource estimation.

    Returns:
        wind speed
        score
        classification
        resource level
        recommendation
    """

    if wind_speed is None:
        raise ValueError(
            "Wind speed is required for resource estimation."
        )

    wind_speed = round(float(wind_speed), 2)

    score = calculate_wind_resource_score(
        wind_speed
    )

    classification = classify_wind_resource(
        wind_speed
    )

    resource_level = get_wind_resource_level(
        score
    )

    recommendation = generate_wind_recommendation(
        wind_speed,
        score
    )

    return {
        "wind_speed": wind_speed,
        "wind_score": score,
        "wind_class": classification,
        "resource_level": resource_level,
        "recommendation": recommendation
    }
