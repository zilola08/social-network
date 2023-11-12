import React from "react";
import "../style/conversation.css";

const Conversation = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={
        props.isSelected ? "selected conversation" : "conversation"
      }
    >
      {props.username}
    </button>
  );
};

export default Conversation;
