import React from 'react';
import BotIconSvg from '../BotIcon';

function ChatMessage({chat}) {
  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role==="model"?"bot":"user"}-message ${chat.isError?"error":""}`}>
        {chat.role === "model" && <BotIconSvg/>}
        <p className="message-text">{chat.text}</p>
      </div>
    )
  );
}

export default ChatMessage;
