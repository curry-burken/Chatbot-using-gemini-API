import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./Components/ChatbotIcon";
import ChatForm from "./Components/ChatForm";
import ChatMessage from "./Components/ChatMessage";
import { companyInfo } from "./Components/CompanyInfo";

function App() {
  const [chatHistory,setChatHistory] = useState([{
    hideInChat: true,
    role:"model",
    text: companyInfo,
  },]);
  const [showChatBot,setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError=false) =>{
      setChatHistory((prev) => [...prev.filter(msg => msg.text !== "Thinking..."),{role:"model", text, isError}])
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
      updateHistory(error.message, true);
    }
  };

  useEffect(()=>{
    chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight, behavior:"smooth"})
  },[chatHistory]);
  
  return (
    <div className={`container ${showChatBot?"show-chatbot":""}`}>
      <button onClick={()=> setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={()=> setShowChatbot(prev => !prev)} className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
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
