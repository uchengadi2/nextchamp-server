const mongoose = require("mongoose");
const validator = require("validator");

const courseInstructorSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },

    instructor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Instructor",
      },
    ],
    course: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
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
    currency: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Currency",
      },
    ],

    hourlyRate: {
      type: Number,
      default: 0,
    },
    homeHourlyRate: {
      type: Number,
      default: 0,
    },
    trackPreference: {
      type: String,
      default: "both",
      enum: ["weekdays", "weekends", "both"],
    },
    deliveryPreference: {
      type: String,
      default: "blended",
      enum: [
        "live-in-person",
        "live-online",
        "recorded-for-self-pace",
        "blended",
      ],
    },
    acceptHomeTeaching: {
      type: Boolean,
      default: false,
      enum: [false, true],
    },

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

    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active", "suspended", "dismissed"],
    },
    comment: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

courseInstructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "instructor",
  });
  next();
});

courseInstructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

courseInstructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

courseInstructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
  });
  next();
});

courseInstructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currency",
  });
  next();
});

const CourseInstructor = mongoose.model(
  "CourseInstructor",
  courseInstructorSchema
);
module.exports = CourseInstructor;
