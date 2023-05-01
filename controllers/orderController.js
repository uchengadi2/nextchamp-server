const Order = require("./../models/orderModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler for getting all Orders
exports.getAllOrders = factory.getAll(Order);

//the handler to create Order
exports.createOrder = factory.createOne(Order);

//the handler to get one Order
exports.getOrder = factory.getOne(Order);

//the handler to update an Order
exports.updateOrder = factory.updateOne(Order);

//the handler to delete an Order
exports.deleteOrder = factory.deleteOne(Order);
