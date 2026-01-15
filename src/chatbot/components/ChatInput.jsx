import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          disabled={disabled}
          rows="1"
        />
        
        <div className="input-actions">
          <button 
            type="button" 
            className="voice-btn"
            title="Voice input (coming soon)"
          >
            <FaMicrophone />
          </button>
          
          <button 
            type="submit" 
            className="send-btn"
            disabled={!input.trim() || disabled}
            title="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;