const router = require("express").Router();
const userCtrl = require("../../controllers/usersCtrl");

router.post("/oneuser", userCtrl.user);
router.post("/users", userCtrl.users);
router.post("/searchUser", userCtrl.searchUser);

module.exports = router;
