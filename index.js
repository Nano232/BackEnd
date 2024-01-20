require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const url = process.env.MONGO_URL;
const httpStatusText = require("./utils/httpStatus");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(url).then(() => {
  console.log("mongodb connected successfully");
});
const port = process.env.PORT;
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/user.route");
app.use(cors());
app.use("/api/courses", coursesRouter); //api/coirses
app.use("/api/users", usersRouter); //api/users
// global middleware for not found route
app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Resource Is Not Available",
  });
});
// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ status: httpStatusText.ERROR, msg: err.message });
});
app.listen(port, () => {
  console.log(`Listining On Port: ${port}`);
});
