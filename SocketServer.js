let users = [];
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    //console.log("SocketServer " + id);
    users.push({ id, socketId: socket.id });
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    //console.log({ users });
  });

  //chat
  socket.on("addMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
  });
};

module.exports = SocketServer;
