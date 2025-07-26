import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-white p-4">
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}

export default App;