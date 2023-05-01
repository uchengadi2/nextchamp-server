const mongoose = require("mongoose");
const validator = require("validator");

const orderOnCompletionSchema = new mongoose.Schema(
  {
    assignedOrder: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "OrderAssignment",
      },
    ],
    onTransitOrder: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "OrderOnTransit",
      },
    ],
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    vehicle: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
      },
    ],
    country: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    refNumber: {
      type: String,
    },
    label: {
      type: String,
    },
    recieverName: {
      type: String,
    },
    recieverPhoneNumber: {
      type: String,
    },

    dateFullfilled: {
      type: Date,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      default: "accepted",
      enum: ["accepted", "rejected"],
    },
    comment: {
      type: String,
      trim: true,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderOnCompletion = mongoose.model(
  "OrderOnCompletion",
  orderOnCompletionSchema
);

module.exports = OrderOnCompletion;
