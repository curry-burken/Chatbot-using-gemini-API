import React, {useRef} from 'react'

function ChatForm({chatHistory,setChatHistory,generateBotResponse}) {
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
          generateBotResponse([...chatHistory,{role:"user",text: userMessage}]);
        },
        600);
    };
  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
        <button className="material-symbols-outlined">keyboard_arrow_up</button>
    </form>
    </div>
  )
}

export default ChatForm
