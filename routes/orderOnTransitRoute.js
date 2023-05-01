const express = require("express");

const orderOnTransitController = require("./../controllers/orderOnTransitController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(orderOnTransitController.getAllOrderOnTransits)
  .post(orderOnTransitController.createOrderOnTransit);

router
  .route("/:id")
  .get(orderOnTransitController.getOrderOnTransit)
  .patch(orderOnTransitController.updateOrderOnTransit)
  .delete(orderOnTransitController.deleteOrderOnTransit);

module.exports = router;
