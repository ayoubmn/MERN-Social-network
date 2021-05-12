const { NativeBuffer } = require("mongoose");
const Users = require("../models/userModel");

const usersCtrl = {
  user: async (req, res) => {
    try {
      const { ID } = req.body.data;
      const user = await Users.findOne({ _id: ID });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  users: async (req, res) => {
    var object = [];

    try {
      const anAsyncFunction = async (id) => {
        const user = await Users.findOne({ _id: id });
        return user;
      };
      const IDs = req.body.data;
      var nbr = Object.keys(IDs).length;
      IDs.map(async (id) => {
        var usr = await anAsyncFunction(id);
        object.push(usr);
        nbr = nbr - 1;
        if (nbr == 0) {
          res.json(object);
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = usersCtrl;
