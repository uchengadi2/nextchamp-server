const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the currency"],
    },
    code: {
      type: String,
      required: [false, "Please provide the currency code"],
    },
    symbol: {
      type: String,
      required: [false, "Please provide the symbol"],
    },
    description: {
      type: String,
      trim: true,
    },
    country: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    dateCreated: {
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
currencySchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

const Currency = mongoose.model("Currency", currencySchema);
module.exports = Currency;
