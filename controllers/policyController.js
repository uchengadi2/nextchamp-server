const Policy = require("./../models/policyModel");
const factory = require("./handlerFactory");

//get the handler to get all policies
exports.getAllPolicy = factory.getAll(Policy);

//the handler to create policy
exports.createPolicy = factory.createOne(Policy);

//the handler to get one policy
exports.getPolicy = factory.getOne(Policy);

//the handler to update a Policy
exports.updatePolicy = factory.updateOne(Policy);

//the handler to delete one Policy
exports.deletePolicy = factory.deleteOne(Policy);
