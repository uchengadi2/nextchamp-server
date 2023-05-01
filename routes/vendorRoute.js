const express = require("express");

const vendorController = require("./../controllers/vendorController");
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
    authController.restrictTo("admin"),
    vendorController.getAllVendors
  )
  .post(vendorController.createVendor);

router.use(authController.protect);

router
  .route("/:id")
  .get(authController.restrictTo("admin", "staff"), vendorController.getVendor)
  .patch(
    authController.restrictTo("admin", "staff"),
    // vendorController.uploadVendorLogo,
    // vendorController.resizeVendorLogo,
    vendorController.updateVendor
  )
  .delete(authController.restrictTo("admin"), vendorController.deleteVendor);

module.exports = router;
