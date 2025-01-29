const mongoose = require("mongoose");
const validator = require("validator");

const courseMentorSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },

    mentor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Mentor",
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

courseMentorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "mentor",
  });
  next();
});
courseMentorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

courseMentorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

courseMentorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
  });
  next();
});

courseMentorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currency",
  });
  next();
});

const CourseMentor = mongoose.model("CourseMentor", courseMentorSchema);
module.exports = CourseMentor;
