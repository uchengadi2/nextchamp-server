const express = require("express");

const courseAssessorController = require("./../controllers/courseAssessorController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseAssessorController.getAllCourseAssessors).post(
  //authController.restrictTo("admin", "set-admin"),
  courseAssessorController.uploadCourseAssessorImage,
  courseAssessorController.resizeCourseAssessorImage,
  courseAssessorController.createCourseAssessor
);

router
  .route("/:id")
  .get(courseAssessorController.getCourseAssessor)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseAssessorController.uploadCourseAssessorImage,
    courseAssessorController.resizeCourseAssessorImage,

    courseAssessorController.updateCourseAssessor
  )
  .delete(courseAssessorController.deleteCourseAssessor);

module.exports = router;
