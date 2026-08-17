"""
Site Intelligence Service

Combines solar suitability, wind suitability,
and wind resource assessment into a unified
renewable energy site intelligence result.
"""

from app.services.prediction_service import (
    calculate_solar_score,
    calculate_wind_score
)

from app.services.wind_resource_service import (
    estimate_wind_resource
)


def get_suitability_label(score: int) -> str:
    """
    Convert an overall score into a suitability label.
    """

    if score >= 85:
        return "Excellent"

    elif score >= 70:
        return "Good"

    elif score >= 50:
        return "Moderate"

    else:
        return "Poor"


def get_deployment_priority(score: int) -> str:
    """
    Determine deployment priority from overall suitability.
    """

    if score >= 85:
        return "High"

    elif score >= 70:
        return "Medium"

    elif score >= 50:
        return "Low"

    else:
        return "Not Recommended"


def generate_site_insight(
    environment,
    wind_speed: float
) -> dict:
    """
    Generate complete renewable energy
    intelligence for a site.
    """

    # ---------------------------------------------
    # Calculate Solar Suitability
    # ---------------------------------------------

    solar_score = calculate_solar_score(
        environment
    )

    # ---------------------------------------------
    # Calculate Wind Suitability
    # ---------------------------------------------

    wind_score = calculate_wind_score(
        environment
    )

    # ---------------------------------------------
    # Wind Resource Assessment
    # ---------------------------------------------

    wind_resource = estimate_wind_resource(
        wind_speed
    )

    # ---------------------------------------------
    # Overall Site Score
    # ---------------------------------------------

    overall_score = round(
        (solar_score + wind_score) / 2
    )

    # ---------------------------------------------
    # Determine Best Energy Source
    # ---------------------------------------------

    if solar_score >= wind_score:
        best_energy_source = "Solar"
    else:
        best_energy_source = "Wind"

    # ---------------------------------------------
    # Suitability
    # ---------------------------------------------

    suitability = get_suitability_label(
        overall_score
    )

    # ---------------------------------------------
    # Deployment Priority
    # ---------------------------------------------

    deployment_priority = get_deployment_priority(
        overall_score
    )

    # ---------------------------------------------
    # Generate Insight
    # ---------------------------------------------

    if best_energy_source == "Solar":

        insight = (
            "Solar energy is the preferred deployment option "
            "because the site has stronger solar suitability "
            "than wind suitability."
        )

    else:

        insight = (
            "Wind energy is the preferred deployment option "
            "because the site has stronger wind suitability "
            "than solar suitability."
        )

    # ---------------------------------------------
    # Final Intelligence Result
    # ---------------------------------------------

    return {
        "solar_score": solar_score,
        "wind_score": wind_score,
        "overall_score": overall_score,

        "best_energy_source": best_energy_source,

        "suitability": suitability,

        "deployment_priority": deployment_priority,

        "wind_resource": wind_resource,

        "insight": insight
    }