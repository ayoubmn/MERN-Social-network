const Users = require("../models/userModel");

const friendshipCtrl = {
  addFriend: async (req, res) => {
    try {
      const { myID, friendId } = req.body;
      const friendToAdd = await Users.findOne({ _id: friendId });

      const friends = await Users.find({
        _id: myID,
        friendsrequest: friendToAdd._id,
      });
      if (friends.length > 0)
        return res.status(500).json({ msg: "user has sent you a request" });

      await Users.findOneAndUpdate(
        { _id: friendToAdd._id },
        {
          $push: { friendsrequest: myID },
        },
        { new: true }
      );

      res.json({ msg: "request  sent" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptFriend: async (req, res) => {
    try {
      const { myID, friendId } = req.body;

      await Users.findOneAndUpdate(
        { _id: myID },
        {
          $push: { friends: friendId },
          $pull: { friendsrequest: friendId },
        },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: friendId },
        {
          $push: { friends: myID },
          $pull: { friendsrequest: myID },
        },
        { new: true }
      );

      res.json({ msg: "user followed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refuseFriend: async (req, res) => {
    try {
      const { myID, friendId } = req.body;

      await Users.findOneAndUpdate(
        { _id: myID },
        {
          $pull: { friendsrequest: friendId },
        },
        { new: true }
      );
      res.json({ msg: "user request refused" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const { myID, friendId } = req.body;

      await Users.findOneAndUpdate(
        { _id: myID },
        {
          $pull: { friends: friendId },
        },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: friendId },
        {
          $pull: { friends: myID },
        },
        { new: true }
      );

      res.json({ msg: "friendship deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteRequest: async (req, res) => {
    try {
      const { myID, friendId } = req.body;

      await Users.findOneAndUpdate(
        { _id: friendId },
        {
          $pull: { friendsrequest: myID },
        },
        { new: true }
      );
      res.json({ msg: "user followed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  friends: async (req, res) => {
    try {
      const { myID } = req.body.data;
      const user = await Users.findOne({ _id: myID });
      res.json(user.friends);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = friendshipCtrl;
