const API_BASE_URL = '/api/chatbot';

export const chatbotService = {
  async initializeChat(userId = null) {
    try {
      console.log('Initializing chat...');
      const response = await fetch(`${API_BASE_URL}/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      
      console.log('Init response status:', response.status);
      const data = await response.json();
      console.log('Init response data:', data);
      return data;
      
    } catch (error) {
      console.error('Error initializing chat:', error);
      // Return fallback response
      return {
        sessionId: 'test_session_' + Date.now(),
        greeting: "Hello! I'm Thor, your WorldPantry assistant.",
        quickReplies: ["Tell me about products", "Shipping info", "Return policy"]
      };
    }
  },

  async sendMessage(message, sessionId, userId = null) {
    try {
      console.log('Sending message:', { message, sessionId });
      const response = await fetch(`${API_BASE_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, sessionId, userId })
      });
      
      console.log('Message response status:', response.status);
      const data = await response.json();
      console.log('Message response data:', data);
      return data;
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Return fallback response
      return {
        response: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        quickReplies: ["Try again", "Contact support"],
        sessionId
      };
    }
  }
};