
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ScamSense API",
    description="AI-powered phishing detection and prevention system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to ScamSense API",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
