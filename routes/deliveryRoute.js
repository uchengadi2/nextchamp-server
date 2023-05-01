const express = require("express");

const deliveryController = require("./../controllers/deliveryController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "staff"),
    deliveryController.getAllDeliveries
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "staff"),
    deliveryController.createDelivery
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(
    authController.restrictTo("admin", "staff"),
    deliveryController.getDelivery
  )
  .patch(
    authController.restrictTo("admin", "staff"),
    deliveryController.updateDelivery
  )
  .delete(
    authController.restrictTo("admin", "staff"),
    deliveryController.deleteDelivery
  );

module.exports = router;
