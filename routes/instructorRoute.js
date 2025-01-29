const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const instructorController = require("./../controllers/instructorController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/instructors" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(instructorController.getAllInstructors)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    instructorController.uploadInstructorImage,
    instructorController.resizeInstructorImage,
    instructorController.createInstructor
  );

router
  .route("/:id")
  .get(instructorController.getInstructor)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    instructorController.uploadInstructorImage,
    instructorController.resizeInstructorImage,
    instructorController.updateInstructor
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    instructorController.deleteInstructor
  );

module.exports = router;
