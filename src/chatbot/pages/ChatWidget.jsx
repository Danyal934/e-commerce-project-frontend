import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import Chatbot from '../components/Chatbot';
import '../styles/chatbot.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Check if user has visited before
      const hasVisited = localStorage.getItem('thor_welcomed');
      if (!hasVisited) {
        setTimeout(() => {
          if (!isOpen) {
            setUnreadCount(1);
          }
        }, 2000);
        localStorage.setItem('thor_welcomed', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0 && !isOpen) {
      setUnreadCount(0);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="chat-widget">
      {isOpen ? (
        <div className="chat-window">
          <Chatbot onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <button 
          className="chat-toggle-btn"
          onClick={toggleChat}
          aria-label="Open chat with Thor"
        >
          <FaCommentDots className="chat-icon" />
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
          <span className="chat-label">Chat with Thor</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;