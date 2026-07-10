from app.models.project import Project
from app.routes.project import router as project_router

from app.models.site import Site
from app.routes.site import router as site_router

from app.models.environmental_data import EnvironmentalData
from app.routes.environment import router as environment_router

from fastapi import FastAPI

from app.core.database import Base, engine

from app.models.user import User

from app.routes.auth import router as auth_router

app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(site_router)
app.include_router(environment_router)

@app.get("/")
def home():
    return {
        "status": "running",
        "message": "Infosys Internship Backend is working successfully."
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }