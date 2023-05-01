const express = require("express");

const relatedProductController = require("./../controllers/relatedProductController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("partner_admin", "partner_user", "admin"),
    relatedProductController.getAllRelatedProducts
  )
  .post(
    authController.protect,
    authController.restrictTo("partner_admin", "partner_user", "admin"),
    relatedProductController.createRelatedProduct
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(
    authController.restrictTo("partner_admin", "partner_user", "admin"),
    relatedProductController.getRelatedProduct
  )
  .patch(
    authController.restrictTo("partner_admin", "partner_user", "admin"),
    relatedProductController.updateRelatedProduct
  )
  .delete(
    authController.restrictTo("partner_admin", "admin"),
    relatedProductController.deleteRelatedProduct
  );

module.exports = router;
