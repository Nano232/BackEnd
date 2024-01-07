const express = require("express");
const app = express();
app.use(express.json());
const { body } = require("express-validator");
const port = 5050;
const coursesController = require("./controllers/corses.controllers");

app.get("/api/courses", coursesController.getAllCourses);

app.get("/api/courses/:courseId", coursesController.getSingleCourse);

app.post(
  "/api/courses",
  [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 3 })
      .withMessage("title at least 3 digits"),
    body("price").notEmpty().withMessage("price is required"),
  ],
  coursesController.addCourse
);

app.patch("/api/courses/:courseId", coursesController.updateCourse);

app.delete("/api/courses/:courseId", coursesController.deleteCourse);

app.listen(port, () => {
  console.log(`Listining On Port: ${port}`);
});
