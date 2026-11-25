
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="ScamSense API",
    description="AI-powered phishing detection and prevention system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class AnalysisRequest(BaseModel):
    content: str

@app.get("/")
def home():
    return {
        "message": "Welcome to ScamSense API",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze")
def analyze(request: AnalysisRequest):
    content = request.content.strip()

    if not content:
        return {
            "status": "error",
            "message": "Please provide content to analyse."
        }

    indicators = []

    warning_phrases = [
        "urgent action",
        "verify your account",
        "claim your prize",
        "password expired",
        "account suspended"
    ]

    for phrase in warning_phrases:
        if phrase in content.lower():
            indicators.append(
                f"Potential warning phrase detected: {phrase}"
            )

    risk_level = "Needs Review" if indicators else "No Basic Indicators Found"

    return {
        "status": "success",
        "risk_level": risk_level,
        "indicators": indicators,
        "message": "This is a basic rule-based assessment, not a security guarantee."
    }
