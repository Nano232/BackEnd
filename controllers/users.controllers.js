const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.modle");
const httpStatusText = require("../utils/httpStatus.js");

const getAllUsers = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});
const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});
const login = () => {};
module.exports = {
  getAllUsers,
  register,
  login,
};
