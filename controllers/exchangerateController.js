const Exchangerate = require("./../models/exchangerateModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all exchange rates
exports.getAllExchangeRates = factory.getAll(Exchangerate);

//the handler to create a exchange rates
exports.createExchangeRate = factory.createOne(Exchangerate);

//the handler to get one exchange rates
exports.getExchangeRate = factory.getOne(Exchangerate);

//the handler to update a exchange rates
exports.updateExchangeRate = factory.updateOne(Exchangerate);

//the handler to delete a exchange rates
exports.deleteExchangeRate = factory.deleteOne(Exchangerate);
