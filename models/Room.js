const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for Users
const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = GlobalMessage = mongoose.model("room", RoomSchema);
