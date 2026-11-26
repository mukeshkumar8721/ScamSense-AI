
import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.gemini_service import analyze_with_gemini

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="ScamSense API",
    description="Multi-Agent AI Phishing Detection System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class AnalysisRequest(BaseModel):
    content: str = Field(min_length=1, max_length=8000)


@app.get("/")
def home():
    return {
        "message": "Welcome to ScamSense AI",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/analyze")
def analyze(request: AnalysisRequest):
    content = request.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Please provide content to analyse."
        )

    try:
        ai_analysis = analyze_with_gemini(content)

        return {
            "status": "success",
            "risk_level": "AI Assessment",
            "message": "AI investigation completed. Review the findings below.",
            "analysis": ai_analysis
        }

    except RuntimeError:
        raise HTTPException(
            status_code=503,
            detail="Gemini AI service is not configured."
        )

    except Exception:
        logger.exception("ScamSense AI analysis failed")
        raise HTTPException(
            status_code=502,
            detail="AI analysis is temporarily unavailable."
        )
