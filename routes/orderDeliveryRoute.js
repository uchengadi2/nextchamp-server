const express = require("express");

const orderDeliveryController = require("../controllers/orderDeliveryController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(orderDeliveryController.getAllOrderDeliveries)
  .post(orderDeliveryController.createOrderDelivery);

router
  .route("/:id")
  .get(orderDeliveryController.getOrderDelivery)
  .patch(orderDeliveryController.updateOrderDelivery)
  .delete(orderDeliveryController.deleteOrderDelivery);

module.exports = router;
