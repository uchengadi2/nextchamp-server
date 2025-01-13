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
    isCourseAuditable: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    weekdayAuditDays: {
      type: String,
    },
    weekendAuditDays: {
      type: String,
    },
    venue: {
      type: String,
    },
    venueLink: {
      type: String,
    },
    weekdaySessionPeriod: {
      type: String,
    },
    weekendSessionPeriod: {
      type: String,
    },
    type: {
      type: String,
    },
    lectureDuration: {
      type: String,
    },
    projectDuration: {
      type: String,
    },

    capstoneProject: {
      type: String,
    },
    passGrade: {
      type: String,
    },
    hasMentorshipCredit: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    mentorshipCredit: {
      type: Number,
      default: 0,
    },
    mentorshipDuration: {
      type: String,
    },
    costPerMentorshipCredit: {
      type: Number,
      default: 0,
    },
    videoId: {
      type: String,
    },
    previewVideoId: {
      type: String,
    },
    deliveryMethod: {
      type: String,
      enum: ["live-in-person", "live-online", "self-pace", "blended", "live"],
    },
    duration: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    channel: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Channel",
      },
    ],

    programme: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Programme",
      },
    ],
    hasMentorshipCredit: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    mentorshipCredit: {
      type: Number,
      default: 0,
    },
    mentorshipDuration: {
      type: String,
    },
    costPerMentorshipCredit: {
      type: Number,
      default: 0,
    },

    series: {
      type: String,
    },
    hasSeries: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

    commencementWeekdaysDate: {
      type: String,
    },

    commencementWeekendsDate: {
      type: String,
    },
    isInstallmentalPaymentAllowed: {
      type: String,
      default: "no",
      enum: ["no", "yes"],
    },
    maximumInstallmentalPayment: {
      type: String,
    },
    paymentOptions: {
      type: String,
    },

    slug: {
      type: String,
    },
    videoType: {
      type: String,
      default: "bundled",
      enum: ["bundled", "splitted-by-lessons", "splitted-by-topics"],
    },
    allowLifeTimeAccess: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    priceLabel: {
      type: String,
    },
  },

  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
