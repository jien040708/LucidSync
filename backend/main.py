from fastapi import FastAPI
from backend.routes.gemini_routes import router as ai_router

app = FastAPI(title="My Backend")

app.include_router(ai_router)

# 헬스체크
@app.get("/health")
def health():
    return {"ok": True}