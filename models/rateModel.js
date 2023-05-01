const mongoose = require("mongoose");
const validator = require("validator");

const rateSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },

    rate: {
      type: Number,
    },

    rateComment: {
      type: String,
      trim: true,
    },

    dateRated: {
      type: Date,
      default: Date.now,
    },

    ratedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;
