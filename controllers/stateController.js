const State = require("../models/stateModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all states
exports.getAllStates = factory.getAll(State);

//the handler to create a state
exports.createState = factory.createOne(State);

//the handler to get one state
exports.getState = factory.getOne(State);

//the handler to update a state
exports.updateState = factory.updateOne(State);

//the handler to delete a state
exports.deleteState = factory.deleteOne(State);
