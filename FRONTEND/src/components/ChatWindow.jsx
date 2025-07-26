import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistory from './ConversationHistory';

const ChatWindow = () => {
  const { loading } = useContext(ChatContext);

  return (
    <div className="flex w-full max-w-6xl mx-auto p-4 h-[80vh] border rounded-lg shadow-md bg-white">
      <div className="w-1/3 border-r pr-4 overflow-y-auto">
        <ConversationHistory />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-2xl font-bold mb-2 text-center">🛍️ AI Shopping Assistant</div>
        <div className="flex-1 overflow-y-auto mb-2 bg-gray-50 rounded p-2">
          <MessageList />
          {loading && (
            <div className="text-gray-500 text-sm animate-pulse">AI is typing...</div>
          )}
        </div>
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;