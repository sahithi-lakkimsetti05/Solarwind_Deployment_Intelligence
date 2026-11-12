import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# Models
from app.models.user import User
from app.models.project import Project
from app.models.site import Site
from app.models.environmental_data import EnvironmentalData
from app.models.prediction_history import PredictionHistory

# Routes
from app.routes.auth import router as auth_router
from app.routes.project import router as project_router
from app.routes.site import router as site_router
from app.routes.environment import router as environment_router
from app.routes.prediction import router as prediction_router
from app.routes.dashboard import router as dashboard_router
from app.routes.location_intelligence import (
    router as location_intelligence_router
)


# ============================================================
# APPLICATION
# ============================================================

app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform",
    version="1.0.0"
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

# Allow localhost during development.
# In production, FRONTEND_URL will be provided
# through the hosting platform environment variables.

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if FRONTEND_URL not in allowed_origins:
    allowed_origins.append(FRONTEND_URL)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# API ROUTES
# ============================================================

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(site_router)
app.include_router(environment_router)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(location_intelligence_router)


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def home():
    return {
        "status": "running",
        "message": (
            "Solar & Wind Deployment Intelligence "
            "Platform backend is working successfully."
        )
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }