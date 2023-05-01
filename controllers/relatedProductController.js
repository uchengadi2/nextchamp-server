const RelatedProduct = require("./../models/relatedProductModel");
const factory = require("./handlerFactory");

//get the handler to get all related product
exports.getAllRelatedProducts = factory.getAll(RelatedProduct);

//the handler to create related product
exports.createRelatedProduct = factory.createOne(RelatedProduct);

//the handler to get one related product
exports.getRelatedProduct = factory.getOne(RelatedProduct);

//the handler to update a related product
exports.updateRelatedProduct = factory.updateOne(RelatedProduct);

//the handler to delete one related product
exports.deleteRelatedProduct = factory.deleteOne(RelatedProduct);
