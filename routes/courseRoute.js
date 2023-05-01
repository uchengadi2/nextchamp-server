const express = require("express");

const courseController = require("./../controllers/courseController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router.route("/").get(courseController.getAllCourses).post(
  //authController.restrictTo("admin"),
  courseController.uploadCourseCoverImage,

  courseController.createCourse
);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(
    courseController.uploadCourseCoverImage,
    courseController.resizeCourseCoverImage,

    courseController.updateCourse
  )
  .delete(
    //authController.restrictTo("admin","user"),
    courseController.deleteCourse
  );

module.exports = router;
