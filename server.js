require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./key").mongoURI;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api", require("./routes/authRouter"));

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected . . ."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
