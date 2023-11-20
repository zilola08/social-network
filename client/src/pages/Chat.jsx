import React, { useContext, useEffect, useState, useRef } from "react";
import "../style/chat.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { Button } from "react-bootstrap";
import { Context } from "../main";
import { io } from "socket.io-client";
// import OnlineUsers from "../components/OnlineUsers";
import AllUsers from "../components/AllUsers";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Chat = () => {
  const [myChats, setMyChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(Context);
  const user_username = user.user.username;
  const axiosPrivate = useAxiosPrivate();

  const getMyChats = async (username) => {
    const { data } = await axiosPrivate.get("api/chats/", {
      params: { username: username },
    });
    return data;
  };

  const addMessage = async (
    senderUsername,
    receiverUsername,
    chatId,
    content
  ) => {
    const response = await axiosPrivate.post("api/messages", {
      senderUsername: senderUsername,
      receiverUsername: receiverUsername,
      chatId: chatId,
      content: content,
    });
    return response;
  };

  const getMessagesInChat = async (id) => {
    const { data } = await axiosPrivate.get("api/messages/", {
      params: { chatId: id },
    });
    return data;
  };

  const getAllPersons = async () => {
    const { data } = await axiosPrivate.get("api/persons");
    return data;
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900", {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.current.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        senderUsername: data.senderUsername,
        receiverUsername: data.receiverUsername,
        chatId: currentChat.chatId,
        content: data.text,
      });
      console.log(
        "check on getMessage logging arrival message inside ongetMessage",
        arrivalMessage
      );
    });
  }, []);

  useEffect(() => {
    getAllUsernames();
  }, []);

  //handling arrival messages
  useEffect(() => {
    //check if arrival not null
    arrivalMessage &&
      //check if usernames of sender matches, so that we dont put arriving msg in the wrong chat
      currentChat?.talkingWith === arrivalMessage.senderUsername &&
      //add the arriving msg data to messages so it renders on screen
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user_username);
    socket.current.on("getUsers", (onlineUsers) => {
      onlineUsers = onlineUsers
        .map((user) => user.username)
        .filter((username) => username !== user_username);
      // setOnlineUsers(onlineUsers);
    });
  }, [user_username]);

  useEffect(() => {
    loadMyChats();
  }, [currentChat, user_username]);

  useEffect(() => {
    loadMessages(currentChat.chatId);
  }, [currentChat]);

  const getAllUsernames = async () => {
    try {
      const response = await getAllPersons();
      const usernames = response
        .map((data) => data.username)
        .filter((username) => username !== user_username);
      setAllUsers(usernames);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMyChats = async () => {
    try {
      const chats = await getMyChats(user_username);
      setMyChats(chats);
    } catch (e) {
      console.log(e);
    }
  };

  const loadMessages = async (id) => {
    try {
      const messages = await getMessagesInChat(id);
      setMessages(messages);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const chatId = currentChat.chatId;
    const sender = user_username;
    const receiver = currentChat.talkingWith;
    const message = {
      sender: sender,
      content: newMessage,
      chatId: chatId,
      receiver: receiver,
    };
    if (message.content.length === 0) return;
    socket.current.emit("sendMessage", {
      senderUsername: sender,
      receiverUsername: receiver,
      text: newMessage,
    });
    try {
      const response = await addMessage(
        message.sender,
        message.receiver,
        message.chatId,
        message.content
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-conversations">
        <div className="chat-conversations__wrapper">
          <h6>My conversations</h6>
          {myChats?.map(function (chat) {
            const talkingWith =
              user_username === chat.sender ? chat.recipient : chat.sender;
            const isSelected = chat.chat_id == currentChat.chatId;
            return (
              <Conversation
                key={chat.chat_id}
                username={talkingWith}
                isSelected={isSelected}
                onClick={() => {
                  setCurrentChat({
                    chatId: chat.chat_id,
                    talkingWith: talkingWith,
                  });
                }}
              ></Conversation>
            );
          })}
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-area__wrapper">
          {messages.length === 0 && !currentChat.chatId ? (
            <div className="chat-area__top">
              <p>
                Please select a conversation/user and send a message to start
                messaging...
              </p>
            </div>
          ) : (
            <div className="chat-area__top">
              {messages.map((message) => {
                return (
                  <Message
                    key={message.message_id}
                    content={message.content}
                    outgoing={
                      user.user.username === message.senderUsername
                        ? true
                        : false
                    }
                  ></Message>
                );
              })}
            </div>
          )}
          <div className="chat-area__bottom">
            <textarea
              type="text"
              placeholder="your message"
              className="chat-area__input input"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            ></textarea>
            <Button
              onClick={handleSend}
              variant="dark"
              className="chat-area__button"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="users-block">
        <div className="chat-users__wrapper all-users">
          <h6 className="users-list">Start a chat with:</h6>
          <AllUsers
            allUsers={allUsers}
            setCurrentChat={setCurrentChat}
            setMyChats={setMyChats}
            username={user_username}
            myChats={myChats}
            loadMyChats={loadMyChats}
          ></AllUsers>
        </div>
      </div>
    </div>
  );
};

export default Chat;
