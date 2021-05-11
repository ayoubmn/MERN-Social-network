require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./key").mongoURI;
const SocketServer = require("./SocketServer");

const app = express();

app.use(express.json());
/* app.use(cors());
 */app.use(cookieParser());

// //Routes
app.use("/api", require("./routes/authRouter"));
app.use("/friends", require("./routes/api/friendshipRouter"));
app.use("/usr", require("./routes/api/usersRouter"));
app.use("/api", require("./routes/api/messageRouter"));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected . . ."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

//socketio
//const socketio = require("socket.io");
const server = require("http").createServer(app);

// server.listen(3000, () => {
//   console.log("listening on *:3000");
// });
// const socketCORSConfig = {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// };
const io = require("socket.io")(server);
const users = [];

io.on("connection", (socket) => {
  SocketServer(socket);
  //console.log(socket.id + "  new connection");
});
io.listen(8000);

app.listen(port, () => console.log(`Server started on port ${port}`));
