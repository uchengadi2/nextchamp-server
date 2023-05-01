const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const productsOnSaleSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    refNumber: {
      type: String,
    },
    salesPricePerUnit: {
      type: Number,
    },
    minimumQuantity: {
      type: Number,
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["inactive", "active"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
productsOnSaleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
});

const ProductsOnSale = mongoose.model("ProductsOnSale", productsOnSaleSchema);

module.exports = ProductsOnSale;
