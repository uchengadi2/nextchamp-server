const Holiday = require("./../models/holidayModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//get all holiday
exports.getAllHolidays = factory.getAll(Holiday);
//create a holiday
exports.createHoliday = factory.createOne(Holiday);

//get a holiday
exports.getHoliday = factory.getOne(Holiday);

//deleting a holiday
exports.deleteHoliday = factory.deleteOne(Holiday);

//updating a holiday
exports.updateHoliday = factory.updateOne(Holiday);
