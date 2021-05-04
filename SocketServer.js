const users = [];
const SocketServer = (socket) => {
  socket.on("joinUser", (id) => {
    console.log(id);
  });
};

module.exports = SocketServer;
