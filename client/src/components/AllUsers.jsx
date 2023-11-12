import React from "react";
import { addChat } from "../http/chatApi";

const AllUsers = (props) => {
  const handleClick = async (receiverUsername) => {
    await props.loadMyChats();
    console.log(props.myChats);
    const username = props.username;
    const myChatUsernames = props.myChats.map((chat) =>
      username === chat.sender ? chat.recipient : chat.sender
    );
    if (myChatUsernames.includes(receiverUsername)) {
      alert('chat with this user is already in "My conversations" list');
      return;
    } else {
      try {
        const response = await addChat(username, receiverUsername);
        console.log(response);
        props.setCurrentChat({
          chatId: response.data.chatId,
          talkingWith: receiverUsername,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (props.allUsers.length === 0) {
    return <p>No other users registered yet</p>;
  } else {
    return props.allUsers.map((user) => (
      <button
        onClick={() => {
          handleClick(user);
        }}
        className="all-users__item conversation"
      >
        {user}
      </button>
    ));
  }
};

export default AllUsers;
