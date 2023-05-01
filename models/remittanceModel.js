const mongoose = require("mongoose");
const validator = require("validator");

const remittanceSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
      required: true,
      unique: true,
    },
    transaction: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "transaction",
      },
    ],
    payment: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Payment",
      },
    ],
    paymentRefNumber: {
      type: String,
    },

    customer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
      },
    ],
    remittanceStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "partial", "complete"],
    },

    amountRemitted: {
      type: Number,
    },
    totalRemittableAmount: {
      type: Number,
    },
    remittanceCurrency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },

    dateRemitted: {
      type: Date,
    },
    remittanceMethod: {
      type: String,
      enum: ["cash-payment", "bank-transfer", "cheque-payment"],
    },

    // bankName: {
    //   type: String,
    // },
    // bankAccountNumber: {
    //   type: String,
    // },
    // accountTitle: {
    //   type: String,
    // },
    // chequeNumber: {
    //   type: String,
    // },
    // bankChequeOwner: {
    //   type: String,
    // },

    postedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
remittanceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "payment",
  });
  next();
});

//QUERY MIDDLEWARE
remittanceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "vendor",
  });
  next();
});

const Remittance = mongoose.model("Remittance", remittanceSchema);

module.exports = Remittance;
