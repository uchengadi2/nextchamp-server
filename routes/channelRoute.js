const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const channelController = require("./../controllers/channelController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/images/channels" });

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(channelController.getAllChannels)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    channelController.uploadChannelImage,
    channelController.resizeChannelImage,
    channelController.createChannel
  );

router
  .route("/:id")
  .get(channelController.getChannel)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    channelController.uploadChannelImage,
    channelController.resizeChannelImage,
    channelController.updateChannel
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    channelController.deleteChannel
  );

module.exports = router;
