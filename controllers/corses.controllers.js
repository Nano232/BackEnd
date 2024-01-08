const { validationResult } = require("express-validator");
const Course = require("../models/course.modle");
const httpStatusText = require("../utils/httpStatus");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: httpStatusText.NOT_FOUND },
      });
    }
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
      code: 400,
    });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: { error: errors.array() } });
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.updateOne(
      { _id: req.params.courseId },
      {
        $set: { ...req.body },
      }
    );
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course: course } });
  } catch (error) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
