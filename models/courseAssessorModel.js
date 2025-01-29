const mongoose = require("mongoose");
const validator = require("validator");

const courseAssessorSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },

    assessor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Assessor",
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
    minimumAllowableHours: {
      type: Number,
      default: 1,
    },

    deliveryPreference: {
      type: String,
      enum: [
        "live-in-person",
        "live-online",
        "recorded-for-self-pace",
        "assessed-offline",
        "blended",
      ],
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

courseAssessorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assessor",
  });
  next();
});
courseAssessorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

courseAssessorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

courseAssessorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
  });
  next();
});

courseAssessorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currency",
  });
  next();
});

const CourseAssessor = mongoose.model("CourseAssessor", courseAssessorSchema);
module.exports = CourseAssessor;
