const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      unique: true,
    },

    country: {
      type: String,
      default: "Nigeria",
      enum: ["Nigeria"],
    },
    currency: {
      name: {
        type: String,
        default: "Naira",
      },
      code: {
        type: String,
        default: "NGN",
      },
    },
    paymentSettings: {
      initialPercentagePaymentForRetention: {
        type: Number,
      },
      initialPaymentDaysToRemit: {
        type: Number,
      },
      secondPercentagePaymentForRetention: {
        type: Number,
      },
      secondPaymentDaysToRemit: {
        type: Number,
      },
      thirdPercentagePaymentForRetention: {
        type: Number,
      },
      thirdPaymentDaysToRemit: {
        type: Number,
      },
    },
    tax: {
      vat: {
        type: Number,
      },
      sales: {
        lagos: {
          type: Number,
        },
        abia: {
          type: Number,
        },
        abuja: {
          Number,
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
