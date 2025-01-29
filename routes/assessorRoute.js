const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const assessorController = require("./../controllers/assessorController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/assessors" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(assessorController.getAllAssessors)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    assessorController.uploadAssessorImage,
    assessorController.resizeAssessorImage,
    assessorController.createAssessor
  );

router
  .route("/:id")
  .get(assessorController.getAssessor)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    assessorController.uploadAssessorImage,
    assessorController.resizeAssessorImage,
    assessorController.updateAssessor
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    assessorController.deleteAssessor
  );

module.exports = router;
