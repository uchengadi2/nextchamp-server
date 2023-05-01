const mongoose = require("mongoose");
const validator = require("validator");

const deliverySchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
      required: true,
      unique: true,
    },

    orderNumber: {
      type: String,
      required: true,
    },
    transaction: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },

    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    customerEmail: {
      type: String,
    },
    customerPhoneNumber: {
      type: String,
    },

    recipientName: {
      type: String,
    },
    recipientPhoneNumber: {
      type: String,
    },
    recipientAddress: {
      type: String,
    },
    destinationState: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    destinationCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },

    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["assigned", "on-transit", "returned", "fullfilled"],
    },
    returnReason: {
      type: String,
      trim: true,
    },
    logisticsPartner: {
      type: mongoose.Schema.ObjectId,
      ref: "LogisticsPartner",
    },
    logisticsPartnerState: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    logisticsPartnerCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    dateAssigned: {
      type: Date,
      default: Date.now,
    },
    assignedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    deliveryCommencementDate: {
      type: Date,
    },
    deliveryCompletedDate: {
      type: Date,
    },
    deliveryReturnedDate: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
deliverySchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
    select: "-product",
  });
  next();
});

//QUERY MIDDLEWARE
deliverySchema.pre(/^find/, function (next) {
  this.populate({
    path: "logisticsPartner",
  });
  next();
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
