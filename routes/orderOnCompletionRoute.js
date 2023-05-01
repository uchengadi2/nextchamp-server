const express = require("express");

const orderOnCompletionController = require("./../controllers/orderOnCompletionController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(orderOnCompletionController.getAllOrderOnCompletions)
  .post(orderOnCompletionController.createOrderOnCompletion);

router
  .route("/:id")
  .get(orderOnCompletionController.getOrderOnCompletion)
  .patch(orderOnCompletionController.updateOrderOnCompletion)
  .delete(orderOnCompletionController.deleteOrderOnCompletion);

module.exports = router;
