const express = require("express");
const router = express.Router();
const { validationSchema } = require("../middlewares/validationSchema");
const coursesController = require("../controllers/corses.controllers");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(), coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
