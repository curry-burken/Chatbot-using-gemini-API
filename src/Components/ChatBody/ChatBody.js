import React, { useContext } from 'react';
import ChatbotIcon from '../BotIcon';
import ChatMessage from '../ChatMessage/ChatMessage';
import { chatContext } from '../../App';
import './ChatBody.css';

function ChatBody() {
    const {chatHistory, chatBodyRef} = useContext(chatContext);
    console.log(chatHistory);
  return (
  <div ref={chatBodyRef} className="chat-body">
    <div className="message bot-message">
        <ChatbotIcon/>
        <p className="message-text">Hey there, How can I help you today?</p>
    </div>
    {chatHistory.map((chat,index)=>(
        <ChatMessage key={index} chat={chat}/>
    ))}
    </div>
  )
}

export default ChatBody;
