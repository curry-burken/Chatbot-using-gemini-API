import React, {useRef} from 'react'

function ChatForm({setChatHistory}) {
    const inputRef = useRef();
    const handleFormSubmit =(e)=>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage)
            return;
        inputRef.current.value = "";
        setChatHistory((history) =>[...history,{role:"user",text: userMessage}]);
    };
  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
        <button class="material-symbols-outlined">keyboard_arrow_up</button>
    </form>
    </div>
  )
}

export default ChatForm
