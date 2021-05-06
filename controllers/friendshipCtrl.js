const Users = require("../models/userModel");

const friendshipCtrl = {
  follow: async (req, res) => {
    try {
      const { myID, email } = req.body;

      const friendToFollow = await Users.findOne({ email: email });

      const friends = await Users.find({
        _id: myID,
        followers: friendToFollow._id,
      });
      if (friends.length > 0)
        return res.status(500).json({ msg: "user already followed" });

      await Users.findOneAndUpdate(
        { _id: friendToFollow._id },
        {
          $push: { followers: myID },
        },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: myID },
        {
          $push: { following: friendToFollow._id },
        },
        { new: true }
      );

      res.json({ msg: "user followed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  following: async (req, res) => {
    try {
      const { myID } = req.body.data;
      const user = await Users.findOne({ _id: myID });
      res.json(user.following);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // followers: async (req, res) => {
  //   const { myID } = req.body;

  //   const user = await Users.findOne({ _id: myID });
  //   res.json(user.followers);
  // },
};

module.exports = friendshipCtrl;
