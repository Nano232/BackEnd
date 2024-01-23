const mongoose = require("mongoose");
const validator = require("validator");
const userRols = require("../utils/user.roles");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email address"],
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRols.USER, userRols.ADMIN, userRols.MANAGER],
    default: userRols.USER,
  },
});

module.exports = mongoose.model("User", userSchema);
