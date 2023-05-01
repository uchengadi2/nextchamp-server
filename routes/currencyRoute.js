const express = require("express");

const currencyController = require("./../controllers/currencyController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

// router.use(authController.protect);

// router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(currencyController.getAllCurrencies)
  .post(
    currencyController.uploadCurrencySymbol,
    currencyController.resizeCurrencySymbol,
    currencyController.createCurrency
  );

router
  .route("/:id")
  .get(currencyController.getCurrency)
  .patch(
    currencyController.uploadCurrencySymbol,
    currencyController.resizeCurrencySymbol,
    currencyController.updateCurrency
  )
  .delete(currencyController.deleteCurrency);

module.exports = router;
