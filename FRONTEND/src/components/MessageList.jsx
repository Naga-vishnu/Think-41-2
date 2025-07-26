import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';

const MessageList = () => {
  const { messages } = useContext(ChatContext);
  return (
    <div>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} content={msg.content} />
      ))}
    </div>
  );
};

export default MessageList;