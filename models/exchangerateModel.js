const mongoose = require("mongoose");

const exchangerateSchema = new mongoose.Schema(
  {
    currency: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Currency",
      },
    ],
    prevailingBaseCurrency: String,
    currencyToBaseCurrencyRate: Number,
    rateCommencementDate: Date,
    rateStatus: {
      type: String,
      default: "pending",
      enum: ["active", "notActive"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Exchangerate = mongoose.model("Exchangerate", exchangerateSchema);
module.exports = Exchangerate;
