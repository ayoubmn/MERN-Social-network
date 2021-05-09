const mongoose = require("mongoose");

// Create Schema for Users
const ConversationsSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    text: String,
  },
  {
    timestamp: true,
  }
);

module.exports = Conversations = mongoose.model(
  "conversations",
  ConversationsSchema
);
