const io = require('socket.io')(8900,{
  cors: {
    origin: "htttp://localhost:5173"
  }
});

let onlineUsers = [];

const addUser = (username,socketId) => {
  !onlineUsers.some(user => user.username === username) &&
    onlineUsers.push({ username,socketId });
  console.log("check addUser logging onlineUsers", onlineUsers);
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId === socketId);
  console.log("user disconnected");
}

const findUser = (receiverUsername) => {
  console.log("check findUser logging onlineUsers", onlineUsers);
  return onlineUsers.find(user => user.username === receiverUsername);
}

io.on("connection", (socket) => {
  console.log("a user is connected")
  // take userID and socketID from user
  socket.on("addUser",username => {
    addUser(username,socket.id);
    io.emit("getUsers",onlineUsers);
  })
  
  socket.on("disconnect",socketId => {
    removeUser(socketId);
    io.emit("getUsers",onlineUsers);
  })

  socket.on("sendMessage",({ senderUsername,receiverUsername,text }) => {
    const receiver = findUser(receiverUsername);
    console.log("check on sendMessage logging receiverUsername",receiverUsername);
    console.log("check on sendMessage->getMessage logging receiver",receiver);
    console.log("check on sendMessage->getMessage logging receiver.socketId",receiver.socketId);
    io.to(receiver.socketId).emit("getMessage",{
      senderUsername,
      receiverUsername,
      text
    });
})
});

