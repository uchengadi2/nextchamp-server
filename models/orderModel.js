const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    transactionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
    productCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    productVendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    quantityAdddedToCart: {
      type: Number,
    },
    orderedQuantity: {
      type: Number,
    },
    orderedPrice: {
      type: Number,
    },
    productCurrency: {
      type: String,
    },

    totalDeliveryCost: {
      type: Number,
    },
    totalProductCost: {
      type: Number,
    },
    recipientName: {
      type: String,
    },
    recipientPhoneNumber: {
      type: String,
    },
    recipientEmailAddress: {
      type: String,
    },

    dateAddedToCart: {
      type: Date,
    },

    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      enum: ["to-be-confirmed", "paid", "not-processed"],
      default: "to-be-confirmed",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "foreigner"],
    },
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "unprocessed",
        "ready-for-delivery",
        "rejected",
        "assigned-for-delivery",
      ],
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    preferredStartDate: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
