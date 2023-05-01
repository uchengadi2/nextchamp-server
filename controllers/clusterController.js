const Cluster = require("./../models/clusterModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");



//the handler to get all clusters
exports.getAllClusters = factory.getAll(Cluster);

//the handler to create a cluster
exports.createCluster = factory.createOne(Cluster);

//the handler to get one cluster
exports.getCluster = factory.getOne(Cluster);

//the handler to update a cluster
exports.updateCluster = factory.updateOne(Cluster);

//the handler to delete a cluster
exports.deleteCluster = factory.deleteOne(Cluster);
