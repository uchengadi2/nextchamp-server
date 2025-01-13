const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    transactionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
    productCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    productVendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    quantityAdddedToCart: {
      type: Number,
    },
    orderedQuantity: {
      type: Number,
    },
    orderedPrice: {
      type: Number,
    },
    productCurrency: {
      type: String,
    },

    totalDeliveryCost: {
      type: Number,
    },
    totalProductCost: {
      type: Number,
    },
    recipientName: {
      type: String,
    },
    recipientPhoneNumber: {
      type: String,
    },
    recipientEmailAddress: {
      type: String,
    },

    dateAddedToCart: {
      type: Date,
    },

    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      enum: ["to-be-confirmed", "paid", "not-processed"],
      default: "to-be-confirmed",
    },
    paymentMethod: {
      type: String,
      default: "audit",
      enum: ["audit", "card", "foreigner"],
    },
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "unprocessed",
        "ready-for-delivery",
        "rejected",
        "assigned-for-delivery",
      ],
    },
    rejectionReason: {
      type: String,
      trim: true,
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
    venueLink: {
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
    videoType: {
      type: String,
      default: "bundled",
      enum: ["bundled", "splitted-by-lessons", "splitted-by-topics"],
    },
    previewVideoId: {
      type: String,
    },
    deliveryMethod: {
      type: String,
      enum: ["live-in-person", "live-online", "self-pace", "blended"],
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
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
