const express = require("express");

const paymentController = require("./../controllers/paymentController");
const authController = require("./../controllers/authController");

const router = express.Router();

//ensure authentication for all payment routes
router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("admin", "user"),
    paymentController.getAllPayments
  )
  .post(
    //authController.restrictTo("user", "admin"),
    paymentController.createPayment
  );

router
  .route("/:id")
  .get(authController.restrictTo("admin", "user"), paymentController.getPayment)
  .patch(
    authController.restrictTo("admin", "user"),
    paymentController.updatePayment
  )
  .delete(authController.restrictTo("admin"), paymentController.deletePayment);

module.exports = router;
