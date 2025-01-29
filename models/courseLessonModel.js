const mongoose = require("mongoose");
const validator = require("validator");

const courseLessonSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },

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

    title: {
      type: String,
    },

    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active"],
    },
    description: {
      type: String,
    },
    videoId: {
      type: String,
      default: null,
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
    sequenceNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

courseLessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
  });
  next();
});

courseLessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channel",
  });
  next();
});

courseLessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: "programme",
  });
  next();
});

const CourseLesson = mongoose.model("CourseLesson", courseLessonSchema);
module.exports = CourseLesson;
