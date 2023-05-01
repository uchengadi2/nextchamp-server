const express = require("express");

const countryController = require("./../controllers/countryController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

// router.use(authController.protect);

// router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(countryController.getAllCountries)
  .post(
    countryController.uploadCountryFlag,
    countryController.resizeCountryFlag,
    countryController.createCountry
  );

router
  .route("/:id")
  .get(countryController.getCountry)
  .patch(
    countryController.uploadCountryFlag,
    countryController.resizeCountryFlag,
    countryController.updateCountry
  )
  .delete(countryController.deleteCountry);

module.exports = router;
