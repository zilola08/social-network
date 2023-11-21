import React, { useRef, useEffect } from "react";
import "../style/message.css";
import { observer } from "mobx-react-lite";

const Message = (props) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={scrollRef}
      className={props.outgoing ? " message-box outgoing" : "message-box"}
    >
      <p className="message-content">{props.content}</p>
    </div>
  );
};

export default Message;
