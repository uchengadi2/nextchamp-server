const OrderOnTransit = require("../models/orderOnTransitModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all OrderOnTransit
exports.getAllOrderOnTransits = factory.getAll(OrderOnTransit);

//the handler to create a OrderOnTransit
exports.createOrderOnTransit = factory.createOne(OrderOnTransit);

//the handler to get one OrderOnTransit
exports.getOrderOnTransit = factory.getOne(OrderOnTransit);

//the handler to update a OrderOnTransit
exports.updateOrderOnTransit = factory.updateOne(OrderOnTransit);

//the handler to delete a OrderOnTransit
exports.deleteOrderOnTransit = factory.deleteOne(OrderOnTransit);
