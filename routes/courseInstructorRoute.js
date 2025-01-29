const express = require("express");

const courseInstructorController = require("./../controllers/courseInstructorController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseInstructorController.getAllCourseInstructors).post(
  //authController.restrictTo("admin", "set-admin"),
  courseInstructorController.uploadCourseInstructorImage,
  courseInstructorController.resizeCourseInstructorImage,
  courseInstructorController.createCourseInstructor
);

router
  .route("/:id")
  .get(courseInstructorController.getCourseInstructor)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseInstructorController.uploadCourseInstructorImage,
    courseInstructorController.resizeCourseInstructorImage,

    courseInstructorController.updateCourseInstructor
  )
  .delete(courseInstructorController.deleteCourseInstructor);

module.exports = router;
