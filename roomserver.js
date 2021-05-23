const express = require("express");
const socket = require("socket.io-old");

let users = [];

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5050;

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});
server.timeout = 0;

io = socket(server);

io.on("connection", (socket) => {
  /*console.log(socket.id);*/

  socket.on("join_room", (data) => {
    socket.join(data);         
    users.push({ id, socketId: socket.id });
    console.log("User Joined Room: " + data);

  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log("USER DISCONNECTED");
  });
});
