const express = require("express");

const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    orderController.getAllOrders
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "user"),
    orderController.createOrder
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(authController.restrictTo("admin", "user"), orderController.getOrder)
  .patch(
    authController.restrictTo("admin", "user"),
    orderController.updateOrder
  )
  .delete(authController.restrictTo("admin"), orderController.deleteOrder);

module.exports = router;
