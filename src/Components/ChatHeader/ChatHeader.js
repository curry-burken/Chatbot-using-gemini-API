import React, { useContext } from 'react';
import BotIconSvg from '../BotIcon';
import { chatContext } from '../../App';
import './ChatHeader.css';

function ChatHeader() {
    const {setShowChatbot} = useContext(chatContext);
    return (
    <div className="chat-header">
        <div className="header-info">
            <BotIconSvg/>
            <h2 className="logo-text">Chatbot</h2>
        </div>
        <button onClick={()=> setShowChatbot(prev => !prev)} className="material-symbols-outlined">keyboard_arrow_down</button>
    </div>
  )
}

export default ChatHeader;
