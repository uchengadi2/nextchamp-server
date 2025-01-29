const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const mentorController = require("./../controllers/mentorController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/mentors" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(mentorController.getAllMentors)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    mentorController.uploadMentorImage,
    mentorController.resizeMentorImage,
    mentorController.createMentor
  );

router
  .route("/:id")
  .get(mentorController.getMentor)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    mentorController.uploadMentorImage,
    mentorController.resizeMentorImage,
    mentorController.updateMentor
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    mentorController.deleteMentor
  );

module.exports = router;
