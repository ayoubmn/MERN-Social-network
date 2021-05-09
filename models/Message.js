const mongoose = require("mongoose");

// Create Schema for Users
const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Types.ObjectId,
      ref: "conversation",
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Messages = mongoose.model("messages", MessageSchema);
