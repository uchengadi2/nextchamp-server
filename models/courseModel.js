const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [false, "Every course must have a name"],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },

    refNumber: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [false, "Please provide the image cover"],
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

    price: {
      type: Number,
    },
    currency: {
      type: String,
      default: "naira",
    },

    keyword1: {
      type: String,
    },
    keyword2: {
      type: String,
    },
    keyword3: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    isFeaturedProduct: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    deliveryMethod: {
      type: String,
      enum: ["live", "self-pace", "hybrid"],
    },
    duration: {
      type: String,
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
    weekdaySessionPeriod: {
      type: String,
    },
    weekendSessionPeriod: {
      type: String,
    },
    track: {
      type: String,
      enum: ["weekdays", "weekends", "weekdays/weekends"],
    },
    type: {
      type: String,
      default: "crash-course",
      enum: [
        "crash-course",
        "regular-course",
        "programmes",
        "channels",
        "assessments",
        "mentoring",
        "mocks",
        "live-interviews-preps",
        "talk-to-expert",
      ],
    },
    lectureDuration: {
      type: String,
    },
    projectDuration: {
      type: String,
    },
    instructor: {
      type: String,
    },
    features: {
      type: String,
    },
    prerequisites: {
      type: String,
    },
    tools: {
      type: String,
    },
    targetAudience: {
      type: String,
    },
    whatToLearn: {
      type: String,
    },
    venueLink: {
      type: String,
    },
    capstoneProject: {
      type: String,
    },
    contents: {
      type: String,
    },
    passGrade: {
      type: String,
    },
    successTips: {
      type: String,
    },
    status: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },
    commencementWeekdaysDate: [
      {
        type: String,
      },
    ],
    commencementWeekendsDate: [
      {
        type: String,
      },
    ],
    showGenericWeekdayStartDateText: {
      type: Boolean,
      enum: [false, true],
    },
    showGenericWeekendStartDateText: {
      type: Boolean,
      enum: [false, true],
    },
    genericWeekdayStartDateText: {
      type: String,
    },
    genericWeekendStartDateText: {
      type: String,
    },
    paymentOptions: {
      type: String,
    },
    slug: {
      type: String,
    },
    hasMentorshipCredit: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    mentorshipCredit: {
      type: Number,
    },
    mentorshipDuration: {
      type: String,
    },
    costPerMentorshipCredit: {
      type: Number,
    },
    series: {
      type: String,
    },
    hasSeries: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    isInstallmentalPaymentAllowed: {
      type: String,
      default: "no",
      enum: ["no", "yes"],
    },
    maximumInstallmentalPayment: {
      type: String,
    },
    majorSkills: [
      {
        type: String,
      },
    ],
    minorSkills: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
