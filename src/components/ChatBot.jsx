// src/components/ChatBot.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBot.css'; // Import CSS for styling

const apiKey = "AIzaSyBL8nXp1w5-lJNKdW-wSo5yGbRm3_ymg4o"; // Your API Key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setLoading(true); // Start loading animation

    try {
      // Call the AI function to get the response
      const response = await runAI(input);
      // Add AI response to messages
      setMessages((prev) => [...prev, { text: response, sender: 'ai' }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't get a response. Please try again.", sender: 'ai' },
      ]);
    } finally {
      setLoading(false); // Stop loading animation
      setInput(''); // Clear input field
    }
  };

  const runAI = async (prompt) => {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      try {
        const result = await chatSession.sendMessage(prompt);
        const responseText = result.response.text();
        const cleanText = responseText.startsWith("##") ? responseText.slice(2) : responseText;
        return cleanText;
      } catch (error) {
        if (error.message.includes('RATE_LIMIT_EXCEEDED') && retries < maxRetries) {
          retries++;
          const delay = Math.pow(2, retries) * 1000; // Exponential backoff
          await new Promise(res => setTimeout(res, delay));
        } else {
          throw error;
        }
      }
    }

    throw new Error('Exceeded maximum retry attempts');
  };

  const formatMessage = (message) => {
    // Format bold, underline, headers, and code snippets
    message = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/__(.*?)__/g, '<h4 class="header">$1</h4>') // Header
      .replace(/`(.*?)`/g, '<pre class="code">$1</pre>'); // Code block

    return message;
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong>
            <span
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
            />
          </div>
        ))}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
