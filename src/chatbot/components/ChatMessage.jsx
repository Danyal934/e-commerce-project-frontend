import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, sender }) => {
  const isBot = sender === 'bot';
  
  return (
    <div className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="message-avatar">
        {isBot ? (
          <div className="avatar-bot">
            <FaRobot />
          </div>
        ) : (
          <div className="avatar-user">
            <FaUser />
          </div>
        )}
      </div>
      
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
        <div className="message-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;