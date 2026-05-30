from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Dashboard Backend",
    description="Optional FastAPI service for exposing project metadata and health status.",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Dashboard Backend is running",
        "status": "online",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "dashboard-backend",
    }


@app.get("/project-info")
def project_info():
    return {
        "name": "Product Dashboard",
        "frontend": "React + TypeScript + Tailwind CSS",
        "backend": "FastAPI",
        "api": "DummyJSON Products API",
        "features": [
            "Dashboard overview",
            "Product detail page",
            "Search and filtering",
            "Sorting",
            "Infinite scroll",
            "Loading and error states",
            "Responsive layout",
            "Light and dark mode",
        ],
    }