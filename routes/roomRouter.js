const router = require("express").Router();
const roomSchema = require("../models/roomModel");

router.post("/rooms", (request, response) => {
  const newMsgRoom = new roomSchema({
    room: request.body.room,
    author: request.body.author,
    message: request.body.message,
  });
  newMsgRoom
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
}),
  router.route("/getRoomMessage").get(function (req, res) {
    roomSchema.find({ room: req.query.room }).exec(function (err, user) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        //console.log(user);
        res.json(user);
      }
    });
  });

module.exports = router;
