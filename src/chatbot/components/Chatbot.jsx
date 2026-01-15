import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import './../../chatbot/styles/chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [quickReplies, setQuickReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
      try {
        console.log('Initializing Thor chatbot...');
        
        // Try to fetch from backend
        const response = await fetch('/api/chatbot/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Chat initialized:', data);
        
        setSessionId(data.sessionId);
        setMessages([{ sender: 'bot', message: data.greeting }]);
        setQuickReplies(data.quickReplies || []);
        
      } catch (error) {
        console.error('Error initializing chat, using fallback:', error);
        
        // Fallback initialization
        const fallbackSessionId = 'fallback_' + Date.now();
        setSessionId(fallbackSessionId);
        setMessages([{ 
          sender: 'bot', 
          message: "Greetings! I am Thor, your WorldPantry assistant. I'm currently experiencing connection issues, but I can still help you with basic information." 
        }]);
        setQuickReplies([
          "Tell me about WorldPantry",
          "What products do you have?",
          "Shipping information",
          "Return policy"
        ]);
      }
    };
    
    initChat();
  }, []);

  // Send message to backend
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending message to backend:', message);
      
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          sessionId: sessionId || 'fallback_session'
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received response:', data);
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', message: data.response }]);
      setQuickReplies(data.quickReplies || []);
      
    } catch (error) {
      console.error('Error sending message, using fallback:', error);
      
      // Fallback responses based on keywords
      let fallbackResponse = "I apologize, but I'm having trouble connecting to my knowledge base. ";
      
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        fallbackResponse += "Welcome to WorldPantry! We offer natural products like honey, dry fruits, oils, and dairy products.";
      } else if (message.toLowerCase().includes('shipping')) {
        fallbackResponse += "Standard shipping takes 5-7 days ($4.99), express takes 2-3 days ($9.99). Free shipping on orders over $50.";
      } else if (message.toLowerCase().includes('return')) {
        fallbackResponse += "We offer 30-day returns for unused items. Contact support for return authorization.";
      } else if (message.toLowerCase().includes('product') || message.toLowerCase().includes('item')) {
        fallbackResponse += "We have honey, dates, oils, olives, and dairy products. Visit our products page for details.";
      } else {
        fallbackResponse += "Please check back in a few moments or contact our support team directly.";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', message: fallbackResponse }]);
      setQuickReplies([
        "Visit Products Page",
        "Contact Support",
        "Shipping Info",
        "Try Again"
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick reply click
  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <ChatHeader onClose={onClose} />
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.message} 
            sender={msg.sender} 
          />
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {quickReplies.length > 0 && (
        <QuickReplies 
          replies={quickReplies} 
          onClick={handleQuickReply} 
        />
      )}
      
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={isLoading} 
      />
    </div>
  );
};

export default Chatbot;