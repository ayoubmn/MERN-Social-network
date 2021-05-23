require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
/* const db = require("./key").mongoURI;
 */
const URI = process.env.MONGODB_URL;
const SocketServer = require("./SocketServer");
const path = require("path");

var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io")(server);
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));

app.use("/api", require("./routes/api/friendshipRouter"));
app.use("/api", require("./routes/api/usersRouter"));
app.use("/api", require("./routes/api/messageRouter"));

app.use("/api", require("./routes/roomRouter"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected . . ."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5050;

//socketio
//const socketio = require("socket.io");

// server.listen(3000, () => {
//   console.log("listening on *:3000");
// });
// const socketCORSConfig = {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// };

io.on("connection", (socket) => {
  SocketServer(socket);
  console.log(socket.id + "  new connection");
});

app.start = app.listen = function () {
  return server.listen.apply(server, arguments);
};

app.start(port);
