import React from "react";
import { addChat } from "../http/chatApi";

const OnlineUsers = (props) => {
  console.log(props.onlineUsers);
  const username = props.username;

  const handleClick = async (receiverUsername) => {
    try {
      const response = await addChat(username, receiverUsername);
      console.log(response);
      props.setCurrentChat({
        chatId: response.data.chatId,
        talkingWith: response.data.recipient,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  if (props.onlineUsers.length === 0) {
    return <p>No online users</p>;
  } else {
    return props.onlineUsers.map((user) => (
      <button
        onClick={() => {
          handleClick(user);
        }}
        className="online-user__item conversation"
      >
        {user}
      </button>
    ));
  }
};

export default OnlineUsers;
