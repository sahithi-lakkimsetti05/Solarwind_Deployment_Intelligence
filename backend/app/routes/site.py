from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.site import Site
from app.models.project import Project

from app.schemas.site import SiteCreate, SiteResponse

router = APIRouter(
    prefix="/sites",
    tags=["Sites"]
)


@router.post(
    "/",
    response_model=SiteResponse,
    status_code=status.HTTP_201_CREATED
)
def create_site(
    site: SiteCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    # Check whether the project exists
    project = (
        db.query(Project)
        .filter(Project.id == site.project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    new_site = Site(
        site_name=site.site_name,
        latitude=site.latitude,
        longitude=site.longitude,
        area=site.area,
        project_id=site.project_id
    )

    db.add(new_site)
    db.commit()
    db.refresh(new_site)

    return new_site


@router.get(
    "/",
    response_model=list[SiteResponse]
)
def get_sites(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    return db.query(Site).all()


@router.get(
    "/{site_id}",
    response_model=SiteResponse
)
def get_site(
    site_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    site = (
        db.query(Site)
        .filter(Site.id == site_id)
        .first()
    )

    if not site:
        raise HTTPException(
            status_code=404,
            detail="Site not found."
        )

    return site