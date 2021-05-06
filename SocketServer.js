let users = [];
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    console.log("SocketServer " + id);
    users.push({ id, socketId: socket.id });
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log({ users });
  });
};

module.exports = SocketServer;
