const OrderAssignment = require("../models/orderAssignmentModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all orderAssignment
exports.getAllOrderAssignments = factory.getAll(OrderAssignment);

//the handler to create a orderAssignment
exports.createOrderAssignment = factory.createOne(OrderAssignment);

//the handler to get one orderAssignment
exports.getOrderAssignment = factory.getOne(OrderAssignment);

//the handler to update a orderAssignment
exports.updateOrderAssignment = factory.updateOne(OrderAssignment);

//the handler to delete a orderAssignment
exports.deleteOrderAssignment = factory.deleteOne(OrderAssignment);
