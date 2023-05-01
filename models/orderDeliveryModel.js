const mongoose = require("mongoose");
const validator = require("validator");

const orderDeliverySchema = new mongoose.Schema(
  {
    assignedOrders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "OrderAssignment",
      },
    ],
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
      },
    ],

    dateCommenced: Date,
    dateFullfilled: Date,

    deliveryStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "onTransit", "fullfilled"],
    },
    scheduledBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    fullfilledBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    teamLead: {
      name: String,
      phoneNumber: String,
      designation: String,
    },
    otherPersonnel: [
      {
        otherPersonnelName: String,
        otherPersonnelphoneNumber: String,
        otherPersonnelDesignation: String,
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderDelivery = mongoose.model("OrderDelivery", orderDeliverySchema);

module.exports = OrderDelivery;
