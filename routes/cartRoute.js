const express = require("express");

const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.route("/").get(cartController.getAllCarts).post(
  //authController.restrictTo("admin"),

  cartController.createCart
);

router
  .route("/:id")
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(
    //authController.restrictTo("admin","user"),
    cartController.deleteCart
  );

module.exports = router;
