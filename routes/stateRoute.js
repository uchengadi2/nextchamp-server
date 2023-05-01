const express = require("express");

const stateController = require("../controllers/stateController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

//router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(stateController.getAllStates)
  .post(stateController.createState);

router
  .route("/:id")
  .get(stateController.getState)
  .patch(stateController.updateState)
  .delete(stateController.deleteState);

module.exports = router;
