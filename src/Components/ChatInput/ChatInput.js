import React, {useContext, useRef} from 'react';
import { chatContext } from '../../App';
import './ChatInput.css';

function ChatInput() {
  
  const {chatHistory,setChatHistory,generateBotResponse} = useContext(chatContext);

  const inputRef = useRef();

  const handleFormSubmit =(e)=>{
      e.preventDefault();
      const userMessage = inputRef.current.value.trim();
      if(!userMessage)
          return;
      inputRef.current.value = "";
      setChatHistory((history) =>[...history,{role:"user",text: userMessage}]);
      
      setTimeout(()=>{
        setChatHistory((history) =>[...history,{role:"model",text: "Thinking..."}]);
        generateBotResponse([...chatHistory,{role:"user",text: `Using the details provided above, please address this query: ${userMessage}`}]);
      },
      600);
  };
  
  return (
    <div className='chat-footer'>
      <div>
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
          <input ref={inputRef} type="text" placeholder="Ask anything" className="message-input" required/>
          <button className="material-symbols-outlined">keyboard_arrow_up</button>
        </form>
      </div>
    </div>
  )
}

export default ChatInput;
