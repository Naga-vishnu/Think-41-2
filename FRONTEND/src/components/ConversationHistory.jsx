import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import axios from 'axios';

const ConversationHistory = () => {
  const [conversations, setConversations] = useState([]);
  const { loadConversation } = useContext(ChatContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/conversations?user_id=1');
        setConversations(res.data);
      } catch (err) {
        console.error('Failed to fetch conversation history', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Past Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => loadConversation(conv.id)}
            className="cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
          >
            {new Date(conv.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistory;