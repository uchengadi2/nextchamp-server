const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [false, "Every course must have a title"],
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

    images: [
      {
        type: String,
      },
    ],

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
    priceLabel: {
      type: String,
    },

    currency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
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

    deliveryMethod: {
      type: String,
      enum: ["live-in-person", "live-online", "self-pace", "blended"],
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
        "certification",
        // "programmes",
        // "channels",
        // "assessments",
        // "mentoring",
        // "mocks",
        // "live-interviews-preps",
        // "talk-to-expert",
        // "books",
        "vocational",
        "special-course"
      ],
    },
    lectureDuration: {
      type: String,
    },
    projectDuration: {
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
      default: "inactive",
      enum: ["inactive", "active"],
    },
    class: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },

    //starts here
    showGenericWeekdayStartDateText: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    showGenericWeekendStartDateText: {
      type: Boolean,
      default: false,
      enum: [false, true],
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
    genericWeekdayStartDateText: {
      type: String,
    },
    genericWeekendStartDateText: {
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
    majorSkills: {
      type: String,
    },

    minorSkills: {
      type: String,
    },

    videoId: {
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
    previewVideoId: {
      type: String,
    },
    slug: {
      type: String,
    },
    acceptablePaymentOptions: {
      type: String,
      default: "all-types",
      enum: ["all-types", "only-bank-transfer", "only-online"],
    },
    allowInstructors: {
      type: Boolean,
      default: true,
      enum: [false, true],
    },
    allowHomeInstructors: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    allowAssessments: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
    allowMentorship: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

// courseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "currency",
//   });
//   next();
// });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
