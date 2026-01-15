import React from 'react';
import { FaTimes, FaRobot, FaQuestionCircle } from 'react-icons/fa';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="chatbot-avatar">
          <FaRobot className="avatar-icon" />
        </div>
        <div className="chatbot-info">
          <h3>Thor</h3>
          <p className="status">WorldPantry Assistant • Online</p>
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="help-btn" 
          title="Help"
          onClick={() => window.open('/faq', '_blank')}
        >
          <FaQuestionCircle />
        </button>
        <button 
          className="close-btn" 
          onClick={onClose}
          title="Close chat"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;