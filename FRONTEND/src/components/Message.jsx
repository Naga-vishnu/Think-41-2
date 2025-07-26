import React from 'react';

const Message = ({ sender, content }) => {
  const isUser = sender === 'user';
  return (
    <div className={`my-2 p-2 rounded-lg max-w-[70%] ${isUser ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-200 mr-auto text-left'}`}>
      <div className="text-sm text-gray-700">{sender === 'user' ? 'You' : 'AI'}</div>
      <div>{content}</div>
    </div>
  );
};

export default Message;