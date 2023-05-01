const mongoose = require("mongoose");
const validator = require("validator");

const orderAssignmentSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },
    label: {
      type: String,
    },
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
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
    vendorCountry: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    orderQuantityAssigned: {
      type: Number,
    },

    dateAssigned: {
      type: Date,
      default: Date.now,
    },
    assignedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "onTransit"],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderAssignment = mongoose.model(
  "OrderAssignment",
  orderAssignmentSchema
);

module.exports = OrderAssignment;
