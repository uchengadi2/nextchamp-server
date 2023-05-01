const express = require("express");

const holidayController = require("./../controllers/holidayController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(holidayController.getAllHolidays)
  .post(holidayController.createHoliday);

router
  .route("/:id")
  .get(holidayController.getHoliday)
  .patch(holidayController.updateHoliday)
  .delete(holidayController.deleteHoliday);

module.exports = router;
