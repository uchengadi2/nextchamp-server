const OrderDelivery = require("../models/orderDeliveryModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all OrderDelivery
exports.getAllOrderDeliveries = factory.getAll(OrderDelivery);

//the handler to create a OrderDelivery
exports.createOrderDelivery = factory.createOne(OrderDelivery);

//the handler to get one OrderDelivery
exports.getOrderDelivery = factory.getOne(OrderDelivery);

//the handler to update a OrderDelivery
exports.updateOrderDelivery = factory.updateOne(OrderDelivery);

//the handler to delete a OrderDelivery
exports.deleteOrderDelivery = factory.deleteOne(OrderDelivery);
