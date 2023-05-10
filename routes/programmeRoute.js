const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const programmeController = require("./../controllers/programmeController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/programmes" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(programmeController.getAllProgrammes)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    programmeController.uploadProgrammeImage,
    programmeController.resizeProgrammeImage,
    programmeController.createProgramme
  );

router
  .route("/:id")
  .get(programmeController.getProgramme)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    programmeController.uploadProgrammeImage,
    programmeController.resizeProgrammeImage,
    programmeController.updateProgramme
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    programmeController.deleteProgramme
  );

module.exports = router;
