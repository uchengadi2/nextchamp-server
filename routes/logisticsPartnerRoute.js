const express = require("express");

const logisticsPartnerController = require("./../controllers/logisticsPartnerController");
const authController = require("./../controllers/authController");

const router = express.Router();

//provide protection with the protect middleware
//router.use(authController.protect);

//ensure appropriate authorization
//router.use(authController.restrictTo());

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "staff"),
    logisticsPartnerController.getAllLogisticsPartners
  )
  .post(logisticsPartnerController.createLogisticsPartner);

router.use(authController.protect);

router
  .route("/:id")
  .get(
    authController.restrictTo("admin", "staff"),
    logisticsPartnerController.getLogisticsPartner
  )
  .patch(
    authController.restrictTo("admin", "staff"),

    logisticsPartnerController.updateLogisticsPartner
  )
  .delete(
    authController.restrictTo("admin"),
    logisticsPartnerController.deleteLogisticsPartner
  );

module.exports = router;
