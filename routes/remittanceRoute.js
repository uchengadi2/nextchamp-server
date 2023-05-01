const express = require("express");

const remittanceController = require("./../controllers/remittanceController");
const authController = require("./../controllers/authController");

const router = express.Router();

//ensure authentication for all remittance routes
router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("admin"),
    remittanceController.getAllRemittances
  )
  .post(
    authController.restrictTo("user", "admin"),
    remittanceController.processRemittance
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("admin", "user"),
    remittanceController.getAllRemittances
  )
  .patch(
    authController.restrictTo("admin", "user"),
    remittanceController.updateRemittance
  )
  .delete(
    authController.restrictTo("admin"),
    remittanceController.deleteRemittance
  );

module.exports = router;
