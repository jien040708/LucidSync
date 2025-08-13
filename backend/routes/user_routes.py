from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from backend.dependies.db_mysql import get_db
from backend.schemas.auth_schema import RegisterIn, LoginIn, UserOut, TokenOut
from backend.services.user_service import create_user, authenticate_user
from backend.dependies.auth import create_access_token, get_current_user
router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(body: RegisterIn, db: Session = Depends(get_db)):
    try:
        u = create_user(db, body.user_id, body.phone_number, body.password)
        return UserOut(id=u.id, user_id=u.user_id, phone_number=u.phone_number, created_at=u.created_at)
    except ValueError as e:
        raise HTTPException(409, str(e))

# OAuth2PasswordRequestForm를 사용하면 form-data로 user_id=xxx, password=yyy 받음
@router.post("/login", response_model=TokenOut)
def login(
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # 기본 필드는 username 이지만 우리는 user_id로 사용
    user_id = form.username
    u = authenticate_user(db, user_id, form.password)
    if not u:
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token(sub=u.user_id)
    return TokenOut(access_token=token)

@router.post("/logout")
def logout():
    # JWT는 서버 상태를 안 가지므로, 보통 클라이언트에서 토큰 삭제로 처리.
    # 서버 블랙리스트가 필요하면 Redis 등으로 구현.
    return {"ok": True}

@router.get("/me", response_model=UserOut)
def me(current = Depends(get_current_user)):
    u = current
    return UserOut(id=u.id, user_id=u.user_id, phone_number=u.phone_number, created_at=u.created_at)
