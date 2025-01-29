const express = require("express");

const courseTopicController = require("./../controllers/courseTopicController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseTopicController.getAllCourseTopics).post(
  //authController.restrictTo("admin", "set-admin"),
  courseTopicController.uploadCourseTopicImage,
  courseTopicController.resizeCourseTopicImage,
  courseTopicController.createCourseTopic
);

router
  .route("/:id")
  .get(courseTopicController.getCourseTopic)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseTopicController.uploadCourseTopicImage,
    courseTopicController.resizeCourseTopicImage,

    courseTopicController.updateCourseTopic
  )
  .delete(courseTopicController.deleteCourseTopic);

module.exports = router;
