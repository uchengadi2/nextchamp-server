const Transaction = require("./../models/transactionModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler for getting all Transactions
exports.getAllTransactions = factory.getAll(Transaction);

//the handler to create Transaction
exports.createTransaction = factory.createOne(Transaction);

//the handler to get one Transaction
exports.getTransaction = factory.getOne(Transaction);

//the handler to update an Transaction
exports.updateTransaction = factory.updateOne(Transaction);

//the handler to delete an Transaction
exports.deleteTransaction = factory.deleteOne(Transaction);
