const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/corses.controllers");
const { body } = require("express-validator");

router.get("/", coursesController.getAllCourses);

router.get("/:courseId", coursesController.getSingleCourse);

router.post(
  "/",
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

router.patch("/:courseId", coursesController.updateCourse);

router.delete("/:courseId", coursesController.deleteCourse);

module.exports = router;
