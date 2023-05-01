const OrderOnCompletion = require("../models/orderOnCompletionModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all OrderOnCompletion
exports.getAllOrderOnCompletions = factory.getAll(OrderOnCompletion);

//the handler to create a OrderOnCompletion
exports.createOrderOnCompletion = factory.createOne(OrderOnCompletion);

//the handler to get one OrderOnCompletion
exports.getOrderOnCompletion = factory.getOne(OrderOnCompletion);

//the handler to update a OrderOnCompletion
exports.updateOrderOnCompletion = factory.updateOne(OrderOnCompletion);

//the handler to delete a OrderOnCompletion
exports.deleteOrderOnCompletion = factory.deleteOne(OrderOnCompletion);
