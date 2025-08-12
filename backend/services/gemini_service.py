from backend.clients.gemini_client import generate_text, generate_json

def ask_gemini_service(prompt: str) -> str:
    # 여기에 로깅/프롬프트 가드/쿼터 체크/캐싱 등을 넣을 수 있음
    return generate_text(prompt)

def ask_gemini_json_service(prompt: str) -> dict:
    # JSON 스키마 검증/후처리 자리
    return generate_json(prompt)
