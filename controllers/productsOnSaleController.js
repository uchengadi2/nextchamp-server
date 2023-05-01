const ProductsOnSale = require("../models/productsOnSaleModel");
const factory = require("./handlerFactory");

//get the handler to get all product on sale
exports.getAllProductsOnSale = factory.getAll(ProductsOnSale);

//the handler to create product on sale
exports.createProductOnSale = factory.createOne(ProductsOnSale);

//the handler to get one product on sale
exports.getProductOnSale = factory.getOne(ProductsOnSale);

//the handler to update a product on sale
exports.updateProductOnSale = factory.updateOne(ProductsOnSale);

//the handler to delete one product on sale
exports.deleteProductOnSale = factory.deleteOne(ProductsOnSale);
