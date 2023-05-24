const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },

    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    currency: {
      type: String,
    },
    refNumber: {
      type: String,
    },
    cartHolder: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    dateAddedToCart: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "unmarked-for-checkout",
      enum: ["unmarked-for-checkout", "marked-for-checkout", "checkedout"],
    },
    preferredStartDate: {
      type: Date,
    },
  },

  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
