const Conversations = require("../models/Conversations");
const Messages = require("../models/Message");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const messageCtrl = {
  createMessage: async (req, res) => {
    try {
      const { recipient, text, sender } = req.body;

      if (!recipient || !text.trim()) return;
      const newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          text,
        },
        {
          new: true,
          upsert: true,
        }
      );
      const newMessage = new Messages({
        Conversation: newConversation._id,
        recipient: recipient,
        sender: sender,
        text,
      });
      await newMessage.save();
      res.json({ newConversation });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getConversations: async (req, res) => {
    try {
      const { user } = req.body;
      const features = new APIfeatures(
        Conversations.find({
          recipients: user._id,
        }),
        req.query
      ).paginating();
      const conversations = await features.query
        .sort("-updateAt")
        .populate("recipients", "avatar username fullname");
      res.json({ conversations, result: conversations.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { user } = req.body;
      const features = new APIfeatures(
        Messages.find({
          $or: [
            { sender: user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: user._id },
          ],
        }),
        req.query
      ).paginating();

      const messages = await features.query.sort("-createdAt");
      res.json({ messages, result: messages.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = messageCtrl;
