"""
Investment Recommendation Service

Provides rule-based investment intelligence for
renewable energy deployment.

The recommendation is based on existing site
suitability and deployment intelligence scores.
"""


def get_investment_rating(overall_score: int) -> str:
    """
    Classify investment attractiveness from the
    overall renewable suitability score.
    """

    if overall_score >= 85:
        return "Highly Attractive"

    elif overall_score >= 70:
        return "Attractive"

    elif overall_score >= 50:
        return "Moderately Attractive"

    else:
        return "Low Attractiveness"


def get_investment_level(overall_score: int) -> str:
    """
    Determine the recommended investment level.
    """

    if overall_score >= 85:
        return "High"

    elif overall_score >= 70:
        return "Medium"

    elif overall_score >= 50:
        return "Limited"

    else:
        return "Avoid"


def get_investment_risk(overall_score: int) -> str:
    """
    Determine investment risk based on site suitability.
    """

    if overall_score >= 85:
        return "Low"

    elif overall_score >= 70:
        return "Moderate"

    elif overall_score >= 50:
        return "High"

    else:
        return "Very High"


def generate_investment_recommendation(
    solar_score: int,
    wind_score: int,
    overall_score: int,
    best_energy_source: str,
    suitability: str,
    deployment_priority: str
) -> dict:
    """
    Generate an investment recommendation using
    existing renewable deployment intelligence.

    This is a rule-based investment assessment and
    does not claim to calculate actual financial ROI.
    """

    # ---------------------------------------------
    # Validate scores
    # ---------------------------------------------

    if solar_score is None:
        raise ValueError("Solar score is required.")

    if wind_score is None:
        raise ValueError("Wind score is required.")

    if overall_score is None:
        raise ValueError("Overall score is required.")

    solar_score = max(0, min(100, int(solar_score)))
    wind_score = max(0, min(100, int(wind_score)))
    overall_score = max(0, min(100, int(overall_score)))

    # ---------------------------------------------
    # Investment classification
    # ---------------------------------------------

    investment_rating = get_investment_rating(
        overall_score
    )

    investment_level = get_investment_level(
        overall_score
    )

    risk_level = get_investment_risk(
        overall_score
    )

    # ---------------------------------------------
    # Investment recommendation
    # ---------------------------------------------

    if overall_score >= 85:

        recommendation = (
            f"Investment is highly recommended for "
            f"{best_energy_source} energy deployment. "
            "The site demonstrates excellent renewable "
            "energy potential and favorable deployment "
            "conditions."
        )

        financial_assessment = (
            "The site has strong investment potential. "
            "A detailed project feasibility and financial "
            "analysis should be conducted before final investment."
        )

        next_step = (
            "Proceed to detailed technical feasibility, "
            "project costing, and financial validation."
        )

    elif overall_score >= 70:

        recommendation = (
            f"Investment is recommended for "
            f"{best_energy_source} energy deployment "
            "subject to further technical and financial assessment."
        )

        financial_assessment = (
            "The site shows good investment potential, "
            "but project costs, energy production estimates, "
            "and financial feasibility should be evaluated."
        )

        next_step = (
            "Conduct technical feasibility and preliminary "
            "financial assessment."
        )

    elif overall_score >= 50:

        recommendation = (
            "Investment may be considered after further "
            "site assessment and risk evaluation."
        )

        financial_assessment = (
            "The site has moderate renewable potential. "
            "Investment should be considered only after "
            "additional technical and financial validation."
        )

        next_step = (
            "Perform detailed site assessment and "
            "cost-benefit analysis before investment."
        )

    else:

        recommendation = (
            "Investment is currently not recommended "
            "for this site."
        )

        financial_assessment = (
            "The site has low renewable suitability and "
            "may present higher deployment and investment risk."
        )

        next_step = (
            "Evaluate alternative sites with stronger "
            "renewable energy potential."
        )

    # ---------------------------------------------
    # Investment reason
    # ---------------------------------------------

    investment_reason = (
        f"{best_energy_source} is currently the preferred "
        f"energy source with an overall site score of "
        f"{overall_score}/100. "
        f"Solar suitability is {solar_score}/100 and "
        f"wind suitability is {wind_score}/100."
    )

    # ---------------------------------------------
    # Final result
    # ---------------------------------------------

    return {
        "investment_rating": investment_rating,
        "investment_level": investment_level,
        "risk_level": risk_level,
        "recommended_source": best_energy_source,
        "suitability": suitability,
        "deployment_priority": deployment_priority,
        "overall_score": overall_score,
        "investment_recommendation": recommendation,
        "financial_assessment": financial_assessment,
        "investment_reason": investment_reason,
        "next_step": next_step
    }