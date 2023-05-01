const express = require("express");

const ProductOnSaleController = require("./../controllers/productsOnSaleController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    //authController.protect,
    //authController.restrictTo("admin", "user", "staff"),
    ProductOnSaleController.getAllProductsOnSale
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "user", "staff"),
    ProductOnSaleController.createProductOnSale
  );

//protect order routes
router.use(authController.protect);

router
  .route("/:id")
  .get(
    //authController.restrictTo("admin", "user", "staff"),
    ProductOnSaleController.getProductOnSale
  )
  .patch(
    authController.restrictTo("admin", "user", "staff"),
    ProductOnSaleController.updateProductOnSale
  )
  .delete(
    authController.restrictTo("admin", "user", "staff"),
    ProductOnSaleController.deleteProductOnSale
  );

module.exports = router;
