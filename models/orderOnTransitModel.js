const mongoose = require("mongoose");
const validator = require("validator");

const orderOnTransitSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },
    label: {
      type: String,
    },
    assignedOrder: [
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
    vendorCountry: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    crewLeaderName: {
      type: String,
    },
    crewLeaderPhoneNumber: {
      type: String,
    },
    crewFirstAssistantName: {
      type: String,
    },
    crewFirstAssistantPhoneNumber: {
      type: String,
    },
    crewSecondAssistantName: {
      type: String,
    },
    crewSecondAssistantPhoneNumber: {
      type: String,
    },

    transitCommencementDate: {
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
      default: "pending",
      enum: ["pending", "fullfilled"],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderOnTransit = mongoose.model("OrderOnTransit", orderOnTransitSchema);

module.exports = OrderOnTransit;
