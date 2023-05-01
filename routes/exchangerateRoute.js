const express = require("express");

const exchangerateController = require("./../controllers/exchangerateController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(exchangerateController.getAllExchangeRates)
  .post(exchangerateController.createExchangeRate);

router
  .route("/:id")
  .get(exchangerateController.getExchangeRate)
  .patch(exchangerateController.updateExchangeRate)
  .delete(exchangerateController.deleteExchangeRate);

module.exports = router;
