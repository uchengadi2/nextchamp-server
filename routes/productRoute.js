const express = require("express");

const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router.route("/").get(productController.getAllProducts).post(
  //authController.restrictTo("admin"),
  productController.uploadProductCoverImage,
  //productController.resizeProductCoverImage,
  // productController.uploadProductFirstImage,
  // productController.resizeProductFirstImage,
  // productController.uploadProductSecondImage,
  // productController.resizeProductSecondImage,
  // productController.uploadProductThirdImage,
  // productController.resizeProductThirdImage,
  // productController.uploadProductFourthImage,
  // productController.resizeProductFourthImage,
  productController.createProduct
);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    productController.uploadProductCoverImage,
    productController.resizeProductCoverImage,
    // productController.uploadProductFirstImage,
    // productController.resizeProductFirstImage,
    // productController.uploadProductSecondImage,
    // productController.resizeProductSecondImage,
    // productController.uploadProductThirdImage,
    // productController.resizeProductThirdImage,
    // productController.uploadProductFourthImage,
    // productController.resizeProductFourthImage,
    productController.updateProduct
  )
  .delete(
    //authController.restrictTo("admin","user"),
    productController.deleteProduct
  );

module.exports = router;
