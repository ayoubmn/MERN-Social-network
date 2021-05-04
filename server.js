require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./key").mongoURI;
const http = require("http");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// //Routes
// app.use("/api", require("./routes/authRouter"));
// app.use("/api/chat", require("./routes/api/messageRouter"));

//socketio
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
  console.log(socket.id + "  new connection");
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected . . ."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
