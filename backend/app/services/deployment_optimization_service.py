"""
Deployment Optimization Service

Determines the most suitable renewable energy
deployment strategy for a site.
"""


def generate_deployment_optimization(
    solar_score: int,
    wind_score: int,
    overall_score: int,
    best_energy_source: str,
    suitability: str,
    deployment_priority: str,
    wind_resource: dict
) -> dict:
    """
    Generate an optimized renewable energy
    deployment recommendation.
    """

    # ---------------------------------------------
    # Determine Primary and Alternative Sources
    # ---------------------------------------------

    if solar_score >= wind_score:
        primary_source = "Solar"
        alternative_source = "Wind"

        source_reason = (
            "Solar has the highest suitability score "
            "for this site."
        )

    else:
        primary_source = "Wind"
        alternative_source = "Solar"

        source_reason = (
            "Wind has the highest suitability score "
            "for this site."
        )

    # ---------------------------------------------
    # Wind Resource Strength
    # ---------------------------------------------

    wind_class = wind_resource.get(
        "wind_class",
        "Unknown"
    )

    resource_level = wind_resource.get(
        "resource_level",
        "Unknown"
    )

    # ---------------------------------------------
    # Deployment Decision
    # ---------------------------------------------

    if overall_score >= 85:

        deployment_decision = "Recommended"

        strategy = (
            f"Prioritize {primary_source} energy deployment "
            "with high deployment priority."
        )

    elif overall_score >= 70:

        deployment_decision = "Recommended with Assessment"

        strategy = (
            f"Proceed with {primary_source} deployment "
            "after detailed technical and financial assessment."
        )

    elif overall_score >= 50:

        deployment_decision = "Further Assessment Required"

        strategy = (
            "Conduct additional environmental and "
            "technical assessment before deployment."
        )

    else:

        deployment_decision = "Not Recommended"

        strategy = (
            "Avoid immediate deployment and evaluate "
            "alternative locations."
        )

    # ---------------------------------------------
    # Wind-specific Optimization
    # ---------------------------------------------

    if primary_source == "Wind":

        optimization_reason = (
            f"Wind is preferred because its suitability "
            f"score ({wind_score}) is higher than the solar "
            f"score ({solar_score}). The site has a "
            f"{wind_class} wind resource with a "
            f"{resource_level.lower()} resource level."
        )

    else:

        optimization_reason = (
            f"Solar is preferred because its suitability "
            f"score ({solar_score}) is higher than the wind "
            f"score ({wind_score})."
        )

    # ---------------------------------------------
    # Final Optimization Result
    # ---------------------------------------------

    return {
        "recommended_source": primary_source,
        "alternative_source": alternative_source,

        "overall_score": overall_score,

        "suitability": suitability,

        "deployment_priority": deployment_priority,

        "deployment_decision": deployment_decision,

        "deployment_strategy": strategy,

        "source_reason": source_reason,

        "optimization_reason": optimization_reason,

        "wind_resource": {
            "wind_class": wind_class,
            "resource_level": resource_level
        }
    }