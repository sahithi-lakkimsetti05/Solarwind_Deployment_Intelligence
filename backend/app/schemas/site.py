from pydantic import BaseModel


class SiteCreate(BaseModel):
    site_name: str
    latitude: float
    longitude: float
    area: float
    project_id: int


class SiteResponse(SiteCreate):
    id: int

    model_config = {
        "from_attributes": True
    }