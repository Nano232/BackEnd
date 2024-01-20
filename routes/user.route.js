const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers.js");
router.route("/").get(usersController.getAllUsers);
router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
