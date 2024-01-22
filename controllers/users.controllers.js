const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.modle");
const generateJWT = require("../utils/generateJWT");
const httpStatusText = require("../utils/httpStatus.js");
const bcrypt = require("bcryptjs");

const getAllUsers = asyncWrapper(async (req, res) => {
  // console.log(req.headers);
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, msg: "this user already created" });
  }
  // password hashing
  const hashePassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashePassword,
  });
  // generate token
  const token = await generateJWT({ email: newUser.email, id: newUser._id });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).josn({
      status: httpStatusText.FAIL,
      msg: "email and password are required",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: "user not found" });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generateJWT({ email: user.email, id: user._id });
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { token },
    });
  } else {
    res
      .status(500)
      .json({ status: httpStatusText.ERROR, msg: "something wrong" });
  }
});
module.exports = {
  getAllUsers,
  register,
  login,
};
