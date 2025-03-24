'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    // Optionally, you can start with a welcome message
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add the user's message to the conversation
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
     
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: updatedMessages
        })
      });
      
      const data = await response.json();
      // Assuming the response format has a choices array with a message object
      const assistantMessage = data.choices[0].message;
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantMessage.content || 'No response content.' }
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-md p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
