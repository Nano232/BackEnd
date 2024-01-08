const { validationResult } = require("express-validator");
const Course = require("../models/course.modle");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course Not Found" });
    }
    return res.json(course);
  } catch (error) {
    return res.status(400).json({ msg: "invalid object id" });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.updateOne(
      { _id: req.params.courseId },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const deleteCourse = async (req, res) => {
  const course = await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ success: true, msg: course });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
