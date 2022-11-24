import React from "react";
import NewSoct from "../Socket";
import './chatDoner.css';
const ChatDoner = () => {
  return (
    <>
        <div className="ourchat_section">
        <div className="ourchat_inner_container">
          <NewSoct />
        </div>
      </div>
    </>
  );
};

export default ChatDoner;
