from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import metrics, leaderboards, checkins

app = FastAPI(title="Pokemon Center API")

# CORS setup for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(metrics.router)
app.include_router(leaderboards.router)
app.include_router(checkins.router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Pokemon Center API is running"}
