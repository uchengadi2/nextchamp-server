const express = require("express");

const transactionController = require("./../controllers/transactionController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    transactionController.getAllTransactions
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "user"),
    transactionController.createTransaction
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(
    authController.restrictTo("admin", "user"),
    transactionController.getTransaction
  )
  .patch(
    authController.restrictTo("admin", "user"),
    transactionController.updateTransaction
  )
  .delete(
    authController.restrictTo("admin"),
    transactionController.deleteTransaction
  );

module.exports = router;
