const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema(
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

    customer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    totalProductAmount: {
      type: Number,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    amountAlreadyPaid: {
      type: Number,
      default: 0,
    },
    totalDeliveryCost: {
      type: Number,
    },

    paymentCurrency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },

    paymentConfirmationStatus: {
      type: String,
      enum: ["confirmed-full", "confirmed-partial", "not-confirmed"],
    },

    paymentConfirmedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    datePosted: {
      type: Date,
      default: Date.now,
    },
    paymentDate: {
      type: Date,
    },
    remittanceStatus: {
      type: String,
      enum: ["pending-or-partial", "full"],
      default: "pending-or-partial",
    },
    totalSumRemitted: {
      type: Number,
      default: 0,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
  });
  next();
});

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
  });
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
