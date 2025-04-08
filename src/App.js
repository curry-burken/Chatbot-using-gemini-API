import { useState } from "react";
import ChatbotIcon from "./Components/ChatbotIcon";
import ChatForm from "./Components/ChatForm";
import ChatMessage from "./Components/ChatMessage";

function App() {
  const [chatHistory,setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) =>{
      setChatHistory((prev) => [...prev.filter(msg => msg.text !== "Thinking..."),{role:"model", text}])
    }

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: formattedHistory
      }),
    };
  
    try 
    {
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");
      
      console.log("Bot response:", data);
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error in generateBotResponse:", error);
    }
  };
  
  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">Hey there, How can I help you today?</p>
          </div>
          {chatHistory.map((chat,index)=>(
            <ChatMessage key={index} chat={chat}/>
          ))}
          
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  );
}

export default App;
