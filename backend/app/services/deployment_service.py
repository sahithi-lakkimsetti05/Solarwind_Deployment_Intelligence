"""
Deployment Intelligence Service

Combines solar and wind suitability scores to determine
the most suitable renewable energy source for a site.
"""


def calculate_overall_score(
    solar_score: int,
    wind_score: int
) -> int:
    """
    Calculate the overall renewable suitability score.

    Solar and wind scores are equally weighted.
    """

    solar_score = max(0, min(100, int(solar_score)))
    wind_score = max(0, min(100, int(wind_score)))

    overall_score = round(
        (solar_score + wind_score) / 2
    )

    return overall_score


def determine_best_energy_source(
    solar_score: int,
    wind_score: int
) -> str:
    """
    Determine the best renewable energy source.

    If solar and wind have the same score, the result
    is Hybrid because both resources have equal suitability.
    """

    if solar_score > wind_score:
        return "Solar"

    elif wind_score > solar_score:
        return "Wind"

    else:
        return "Hybrid"


def classify_deployment_potential(
    overall_score: int
) -> str:
    """
    Classify the overall deployment potential.
    """

    if overall_score >= 85:
        return "Excellent"

    elif overall_score >= 70:
        return "Good"

    elif overall_score >= 50:
        return "Moderate"

    else:
        return "Poor"


def generate_deployment_recommendation(
    solar_score: int,
    wind_score: int,
    overall_score: int,
    best_energy_source: str
) -> str:
    """
    Generate a human-readable deployment recommendation.
    """

    if best_energy_source == "Solar":

        if overall_score >= 85:
            return (
                "The site has excellent renewable energy potential "
                "with solar energy being the most suitable option. "
                "The site is highly suitable for solar deployment."
            )

        elif overall_score >= 70:
            return (
                "Solar energy is the most suitable renewable source "
                "for this site. The site shows good deployment potential."
            )

        elif overall_score >= 50:
            return (
                "Solar energy has better suitability than wind energy, "
                "but further assessment is recommended before deployment."
            )

        else:
            return (
                "Solar has the highest suitability among the available "
                "options, but the overall renewable potential is low."
            )

    elif best_energy_source == "Wind":

        if overall_score >= 85:
            return (
                "The site has excellent renewable energy potential "
                "with wind energy being the most suitable option. "
                "The site is highly suitable for wind deployment."
            )

        elif overall_score >= 70:
            return (
                "Wind energy is the most suitable renewable source "
                "for this site. The site shows good deployment potential."
            )

        elif overall_score >= 50:
            return (
                "Wind energy has better suitability than solar energy, "
                "but further assessment is recommended before deployment."
            )

        else:
            return (
                "Wind has the highest suitability among the available "
                "options, but the overall renewable potential is low."
            )

    else:

        return (
            "Solar and wind energy have equal suitability at this site. "
            "A hybrid renewable energy deployment strategy may be considered."
        )


def generate_deployment_intelligence(
    solar_score: int,
    wind_score: int
) -> dict:
    """
    Generate complete deployment intelligence.

    Returns:
        solar score
        wind score
        overall score
        best energy source
        deployment potential
        recommendation
    """

    if solar_score is None:
        raise ValueError(
            "Solar score is required."
        )

    if wind_score is None:
        raise ValueError(
            "Wind score is required."
        )

    solar_score = max(
        0,
        min(100, int(solar_score))
    )

    wind_score = max(
        0,
        min(100, int(wind_score))
    )

    overall_score = calculate_overall_score(
        solar_score,
        wind_score
    )

    best_energy_source = determine_best_energy_source(
        solar_score,
        wind_score
    )

    deployment_potential = classify_deployment_potential(
        overall_score
    )

    recommendation = generate_deployment_recommendation(
        solar_score,
        wind_score,
        overall_score,
        best_energy_source
    )

    return {
        "solar_score": solar_score,
        "wind_score": wind_score,
        "overall_score": overall_score,
        "best_energy_source": best_energy_source,
        "deployment_potential": deployment_potential,
        "recommendation": recommendation
    }