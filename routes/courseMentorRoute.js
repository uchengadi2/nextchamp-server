const express = require("express");

const courseMentorController = require("./../controllers/courseMentorController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.route("/").get(courseMentorController.getAllCourseMentors).post(
  //authController.restrictTo("admin", "set-admin"),
  courseMentorController.uploadCourseMentorImage,
  courseMentorController.resizeCourseMentorImage,
  courseMentorController.createCourseMentor
);

router
  .route("/:id")
  .get(courseMentorController.getCourseMentor)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    courseMentorController.uploadCourseMentorImage,
    courseMentorController.resizeCourseMentorImage,

    courseMentorController.updateCourseMentor
  )
  .delete(courseMentorController.deleteCourseMentor);

module.exports = router;
