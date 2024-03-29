const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatus");
const verfiyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json("token is required");
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: httpStatusText.ERROR, msg: "invalid token" });
  }
};
module.exports = verfiyToken;
