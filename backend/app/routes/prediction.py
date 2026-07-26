from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.environmental_data import EnvironmentalData
from app.services.prediction_service import calculate_solar_score

from app.services.prediction_service import (
    calculate_solar_score,
    calculate_wind_score
)

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)


@router.get("/solar/{site_id}")
def predict_solar(site_id: int,
                  db: Session = Depends(get_db),
                  current_user=Depends(get_current_user)):

    environment = (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.site_id == site_id)
        .order_by(EnvironmentalData.recorded_at.desc())
        .first()
    )

    if not environment:
        raise HTTPException(
            status_code=404,
            detail="Environmental data not found"
        )

    score = calculate_solar_score(environment)

    if score >= 85:
        recommendation = "Excellent"
    elif score >= 70:
        recommendation = "Good"
    elif score >= 50:
        recommendation = "Moderate"
    else:
        recommendation = "Poor"

    return {
        "site_id": site_id,
        "solar_score": score,
        "recommendation": recommendation
    }


@router.get("/wind/{site_id}")
def predict_wind(
    site_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    environment = (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.site_id == site_id)
        .order_by(EnvironmentalData.recorded_at.desc())
        .first()
    )

    if not environment:
        raise HTTPException(
            status_code=404,
            detail="Environmental data not found"
        )

    score = calculate_wind_score(environment)

    if score >= 85:
        recommendation = "Excellent"
    elif score >= 70:
        recommendation = "Good"
    elif score >= 50:
        recommendation = "Moderate"
    else:
        recommendation = "Poor"

    return {
        "site_id": site_id,
        "wind_score": score,
        "recommendation": recommendation
    }