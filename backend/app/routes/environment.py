from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_roles

from app.models.environmental_data import EnvironmentalData
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
    current_user=Depends(require_roles(["Admin", "GIS Analyst"]))
):
    new_record = EnvironmentalData(**data.model_dump())

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
    current_user=Depends(get_current_user)
):
    return db.query(EnvironmentalData).all()


@router.get(
    "/site/{site_id}",
    response_model=list[EnvironmentalDataResponse]
)
def get_site_environmental_data(
    site_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.site_id == site_id)
        .all()
    )


@router.put(
    "/{record_id}",
    response_model=EnvironmentalDataResponse
)
def update_environmental_data(
    record_id: int,
    data: EnvironmentalDataCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Admin", "GIS Analyst"]))
):
    db_record = (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.id == record_id)
        .first()
    )

    if not db_record:
        raise HTTPException(
            status_code=404,
            detail="Environmental data not found"
        )

    db_record.site_id = data.site_id
    db_record.temperature = data.temperature
    db_record.humidity = data.humidity
    db_record.wind_speed = data.wind_speed
    db_record.solar_irradiance = data.solar_irradiance
    db_record.rainfall = data.rainfall
    db_record.air_pressure = data.air_pressure

    db.commit()
    db.refresh(db_record)

    return db_record

@router.delete(
    "/{record_id}"
)
def delete_environmental_data(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Admin"]))
):
    db_record = (
        db.query(EnvironmentalData)
        .filter(EnvironmentalData.id == record_id)
        .first()
    )

    if not db_record:
        raise HTTPException(
            status_code=404,
            detail="Environmental data not found"
        )

    db.delete(db_record)
    db.commit()

    return {
        "message": "Environmental data deleted successfully"
    }