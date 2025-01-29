const express = require("express");

const courseLessonController = require("./../controllers/courseLessonController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseLessonController.getAllCourseLessons).post(
  //authController.restrictTo("admin", "set-admin"),
  courseLessonController.uploadCourseLessonImage,
  courseLessonController.resizeCourseLessonImage,
  courseLessonController.createCourseLesson
);

router
  .route("/:id")
  .get(courseLessonController.getCourseLesson)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseLessonController.uploadCourseLessonImage,
    courseLessonController.resizeCourseLessonImage,

    courseLessonController.updateCourseLesson
  )
  .delete(courseLessonController.deleteCourseLesson);

module.exports = router;
