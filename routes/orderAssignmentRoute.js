const express = require("express");

const orderAssignmentController = require("./../controllers/orderAssignmentController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(orderAssignmentController.getAllOrderAssignments)
  .post(orderAssignmentController.createOrderAssignment);

router
  .route("/:id")
  .get(orderAssignmentController.getOrderAssignment)
  .patch(orderAssignmentController.updateOrderAssignment)
  .delete(orderAssignmentController.deleteOrderAssignment);

module.exports = router;
