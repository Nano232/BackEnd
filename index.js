require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const url = process.env.MONGO_URL;
const httpStatusText = require("./utils/httpStatus");
const mongoose = require("mongoose");
mongoose.connect(url).then(() => {
  console.log("mongodb connected successfully");
});
const port = process.env.PORT;

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Resource Is Not Available",
  });
});

app.listen(port, () => {
  console.log(`Listining On Port: ${port}`);
});
