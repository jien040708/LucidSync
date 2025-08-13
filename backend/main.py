from fastapi import FastAPI
from backend.routes.gemini_routes import router as ai_router
from backend.routes.stock_routes import router as stock_router
from backend.routes.portfolio_routes import router as portfolio_router
from backend.routes.user_routes import router as user_router
from backend.dependies.db_mysql import engine, Base

app = FastAPI(title="LucidSync")

app.include_router(ai_router)
app.include_router(stock_router)
app.include_router(portfolio_router)
app.include_router(user_router)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# 헬스체크
@app.get("/health")
def health():
    return {"ok": True}