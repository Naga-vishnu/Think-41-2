from fastapi import FastAPI
from app.routers import chat

app = FastAPI(title="E-Commerce AI Chat Backend")

app.include_router(chat.router)
