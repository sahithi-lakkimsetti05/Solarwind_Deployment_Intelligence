from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.environmental_data import EnvironmentalData
from app.models.site import Site

from app.schemas.environmental_data import (
    EnvironmentalDataCreate,
    EnvironmentalDataResponse,
)

router = APIRouter(
    prefix="/environment",
    tags=["Environmental Data"]
)


@router.post(
    "/",
    response_model=EnvironmentalDataResponse,
    status_code=status.HTTP_201_CREATED
)
def create_environmental_data(
    data: EnvironmentalDataCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Check if site exists
    site = (
        db.query(Site)
        .filter(Site.id == data.site_id)
        .first()
    )

    if not site:
        raise HTTPException(
            status_code=404,
            detail="Site not found."
        )

    new_record = EnvironmentalData(
        site_id=data.site_id,
        temperature=data.temperature,
        humidity=data.humidity,
        wind_speed=data.wind_speed,
        solar_irradiance=data.solar_irradiance,
        rainfall=data.rainfall,
        air_pressure=data.air_pressure
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


@router.get(
    "/",
    response_model=list[EnvironmentalDataResponse]
)
def get_environmental_data(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return db.query(EnvironmentalData).all()


@router.get(
    "/site/{site_id}",
    response_model=list[EnvironmentalDataResponse]
)
def get_site_environmental_data(
    site_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.site_id == site_id)
        .all()
    )