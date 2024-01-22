const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers.js");
const verfiyToken = require("../middlewares/verfiyToken.js");
router.route("/").get(verfiyToken, usersController.getAllUsers);
router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
