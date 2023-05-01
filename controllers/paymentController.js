const Payment = require("./../models/paymentModel");
const factory = require("./handlerFactory");

//get all payments
exports.getAllPayments = factory.getAll(Payment);

//Create or initiate Payment
exports.createPayment = factory.createOne(Payment);

//get one payment
exports.getPayment = factory.getOne(Payment);

//update payment
exports.updatePayment = factory.updateOne(Payment);

//delete payment
exports.deletePayment = factory.deleteOne(Payment);
