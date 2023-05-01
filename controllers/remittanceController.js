const Remittance = require("../models/remittanceModel");
const factory = require("./handlerFactory");

//get all remittances
exports.getAllRemittances = factory.getAll(Remittance);

//Create or initiate Remittance
exports.processRemittance = factory.createOne(Remittance);

//get one Remittance
exports.getRemittance = factory.getOne(Remittance);

//update remittance
exports.updateRemittance = factory.updateOne(Remittance);

//delete remittance
exports.deleteRemittance = factory.deleteOne(Remittance);
