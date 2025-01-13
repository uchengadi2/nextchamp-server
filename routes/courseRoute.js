const express = require("express");

const courseController = require("./../controllers/courseController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseController.getAllCourses).post(
  //authController.restrictTo("admin", "set-admin"),
  courseController.uploadCourseImages,
  courseController.resizeCourseImages,
  courseController.createCourse
);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseController.uploadCourseImages,
    courseController.resizeCourseImages,

    courseController.updateCourse
  )
  .delete(courseController.deleteCourse);

module.exports = router;
