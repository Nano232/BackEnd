const express = require("express");
const app = express();
app.use(express.json());
const url =
  "mongodb+srv://elzoranymohamed232:23201823@learn-mongodb.imnrfk8.mongodb.net/codeZone?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(url).then(() => {
  console.log("mongodb connected successfully");
});
const port = 5050;

const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Listining On Port: ${port}`);
});
