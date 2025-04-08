import { useState, useRef, useEffect, createContext } from "react";
import ChatInput from "./Components/ChatInput/ChatInput";
import { companyInfo } from "./Components/CompanyInfo";
import ChatBody from "./Components/ChatBody/ChatBody";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
export const chatContext = createContext();

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
    } 
    catch (error){
      updateHistory(error.message, true);
    }
  };

  useEffect(()=>{
    chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight, behavior:"smooth"})
  },[chatHistory]);

  const contextValue = {
    chatHistory,
    setChatHistory,
    generateBotResponse,
    chatBodyRef,
    setShowChatbot,
  };

  return (
    <div className={`container ${showChatBot?"show-chatbot":""}`}>
      <button onClick={()=> setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        <chatContext.Provider value={contextValue}>
          <ChatHeader/>
          <ChatBody/>
          <ChatInput/>
        </chatContext.Provider>
      </div>
    </div>
  );
}

export default App;
