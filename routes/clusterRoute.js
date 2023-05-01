const express = require("express");

const clusterController = require("./../controllers/clusterController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(clusterController.getAllClusters)
  .post(clusterController.createCluster);

router
  .route("/:id")
  .get(clusterController.getCluster)
  .patch(clusterController.updateCluster)
  .delete(clusterController.deleteCluster);

module.exports = router;
