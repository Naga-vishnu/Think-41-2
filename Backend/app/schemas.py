from pydantic import BaseModel
from typing import List
from datetime import datetime

class MessageCreate(BaseModel):
    sender: str
    content: str

class MessageRead(BaseModel):
    sender: str
    content: str
    timestamp: datetime
    class Config:
        orm_mode = True

class ConversationRead(BaseModel):
    id: int
    started_at: datetime
    messages: List[MessageRead]
    class Config:
        orm_mode = True