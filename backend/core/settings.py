from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    google_api_key: str
    gemini_model: str = "gemini-1.5-flash"
    gemini_temp: float = 0.7

    class Config:
        env_file = ".env"

settings = Settings()