const express = require("express");

const rateController = require("./../controllers/rateController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    rateController.getAllRates
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "user"),
    rateController.createRate
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(authController.restrictTo("admin", "user"), rateController.getRate)
  .patch(authController.restrictTo("admin", "user"), rateController.updateRate)
  .delete(authController.restrictTo("admin"), rateController.deleteRate);

module.exports = router;
