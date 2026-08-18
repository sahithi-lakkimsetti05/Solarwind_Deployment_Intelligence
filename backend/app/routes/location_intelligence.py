from fastapi import APIRouter, HTTPException

from app.services.location_intelligence_service import (
    generate_location_intelligence
)


router = APIRouter(
    prefix="/location-intelligence",
    tags=["Location Intelligence"]
)


# ============================================================
# LOCATION RENEWABLE ASSESSMENT
# ============================================================

@router.get("/assess")
def assess_location(place: str):

    try:

        result = generate_location_intelligence(
            place
        )

        return result

    except ValueError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error)
        )

    except Exception as error:

        print(
            "Location intelligence error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to assess the requested location."
        )