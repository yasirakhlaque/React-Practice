// App.jsx
import { useState } from 'react';
import './App.css';
import OpenAI from 'openai';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: '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', // Replace with your actual API key
    dangerouslyAllowBrowser: true // Note: In production, handle API calls through backend
  });

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      // Add user message to chat
      const userMessage = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);

      // Get response from OpenAI
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'gpt-3.5-turbo',
      });

      // Add AI response to chat
      const aiMessage = { 
        role: 'assistant', 
        content: completion.choices[0].message.content 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <>
      <div className="main">
        <div className="side">
          <div className="upperside">
            <div className="logo">
              <img src="Images/chat.png" alt="" className="logo" />
              <h2>ChatGPT</h2>
            </div>
            <button className="new">
              <i className="fa-solid fa-plus"></i>New Chat
            </button>
            <div className="queries">
              <button className="query">
                <i className="fa-regular fa-message"></i>Provide Resume Template
              </button>
              <button className="query">
                <i className="fa-regular fa-message"></i>Why Web Development ?
              </button>
            </div>
          </div>
          <div className="lowerside">
            <button className="home">
              <i className="fa-solid fa-house"></i>Home
            </button>
            <button className="Saved">
              <i className="fa-solid fa-bookmark"></i>Saved
            </button>
            <button className="Upgrade">
              <i className="fa-solid fa-hand-holding-dollar"></i>Upgrade
            </button>
          </div>
        </div>
        <div className="chat-area">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${message.role === 'user' ? 'userMsg' : 'botMsg'} chat`}
            >
              <img 
                src={message.role === 'user' ? "Images/user.jpg" : "Images/openAI-chat-gpt-1-4.jpg"} 
                alt={`${message.role} image`} 
                className='chat-img' 
              />
              <p className="txt">{message.content}</p>
            </div>
          ))}
          <div className="inp">
            <div className="request">
              <input 
                type="text" 
                placeholder='Send Your Queries' 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading}
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </div>
            <div className="warning">
              <p className="disclamer">
                ChatGPT might produce inappropriate responses please verify the information given by ChatGPT
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;