import React from "react";


const AllUsers = (props) => {
  const handleClick = async (receiverUsername) => {
    await props.loadMyChats();
    // console.log("props.myChats",props.myChats);
    const username = props.username;
    const myChatUsernames = props.myChats.map((chat) =>
      username === chat.sender ? chat.recipient : chat.sender
    );
    // console.log('myChatUsernames',myChatUsernames);
    if (myChatUsernames.includes(receiverUsername)) {
      alert('chat with this user is already in "My conversations" list');
      return;
    } else {
      try {
        props.setCurrentChatNoId(receiverUsername)
        props.loadMessages();
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (props.allUsers.length === 0) {
    return <p>No other users have registered yet</p>;
  } else {
    return props.allUsers.map((user) => (
      <button
        key={user}
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
