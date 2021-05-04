let users = [];
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    console.log("ttttttttttt" + id);
    users.push({ id, socketId: socket.id });
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });
};

module.exports = SocketServer;
