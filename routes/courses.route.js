const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/corses.controllers");
const { body } = require("express-validator");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
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

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
