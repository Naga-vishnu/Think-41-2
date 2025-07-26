import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content) => {
    const newMessage = { sender: 'user', content };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        user_id: 1,
        message: content,
        conversation_id: conversationId,
      });
      setConversationId(res.data.conversation_id);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', content: res.data.ai_response }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', content: 'Error contacting AI agent.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/conversations/${id}`);
      setMessages(res.data.messages);
      setConversationId(id);
    } catch (err) {
      console.error('Error loading conversation', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, loadConversation }}>
      {children}
    </ChatContext.Provider>
  );
};
