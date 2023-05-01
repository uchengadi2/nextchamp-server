const Delivery = require("./../models/deliveryModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler for getting all deliveries
exports.getAllDeliveries = factory.getAll(Delivery);

//the handler to create  delivery
exports.createDelivery = factory.createOne(Delivery);

//the handler to get one delivery
exports.getDelivery = factory.getOne(Delivery);

//the handler to update an delivery
exports.updateDelivery = factory.updateOne(Delivery);

//the handler to delete an delivery
exports.deleteDelivery = factory.deleteOne(Delivery);
