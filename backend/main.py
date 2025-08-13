from fastapi import FastAPI
from backend.routes.gemini_routes import router as ai_router
from backend.routes.stock_routes import router as stock_router
from backend.routes.portfolio_routes import router as portfolio_router
from backend.routes.user_routes import router as user_router
from backend.dependies.db_mysql import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LucidSync")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # 프론트 주소
    allow_credentials=True,           # 쿠키/인증 사용 시 True
    allow_methods=["*"],              # 또는 ["GET","POST","PUT","DELETE","OPTIONS"]
    allow_headers=["*"],              # 또는 ["Content-Type","Authorization",...]
)

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