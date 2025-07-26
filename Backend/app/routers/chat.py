from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app import models
from app.llm import get_ai_response

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/api/chat")
def chat(user_id: int, message: str, conversation_id: int = None, db: Session = Depends(get_db)):
    if conversation_id is None:
        conversation = models.Conversation(user_id=user_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        conversation_id = conversation.id
    else:
        conversation = db.query(models.Conversation).filter_by(id=conversation_id, user_id=user_id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

    user_msg = models.Message(
        conversation_id=conversation_id,
        sender="user",
        content=message
    )
    db.add(user_msg)
    db.commit()

    ai_response = get_ai_response(message)

    ai_msg = models.Message(
        conversation_id=conversation_id,
        sender="ai",
        content=ai_response
    )
    db.add(ai_msg)
    db.commit()

    return {
        "conversation_id": conversation_id,
        "user_message": message,
        "ai_response": ai_response
    }
