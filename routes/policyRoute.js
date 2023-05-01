const express = require("express");

const policyController = require("./../controllers/policyController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect this route with both authentication and authorization middleware
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(policyController.getAllPolicy)
  .post(policyController.createPolicy);

router
  .route("/:id")
  .get(policyController.getPolicy)
  .patch(policyController.updatePolicy)
  .delete(policyController.deletePolicy);

module.exports = router;
