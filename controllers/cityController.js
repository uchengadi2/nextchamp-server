const City = require("./../models/cityModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all cities
exports.getAllCities = factory.getAll(City);

//the handler to create a city
exports.createCity = factory.createOne(City);

//the handler to get one city
exports.getCity = factory.getOne(City);

//the handler to update a city
exports.updateCity = factory.updateOne(City);

//the handler to delete a city
exports.deleteCity = factory.deleteOne(City);
