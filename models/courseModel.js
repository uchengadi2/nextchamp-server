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
      enum: ["live", "self-pace"],
    },
    duration: {
      type: Number,
    },
    commencementDate: {
      type: Date,
    },
    venue: {
      type: String,
    },
    sessionDuration: {
      type: Number,
    },
    sessionPeriod: {
      type: String,
    },
    studyPeriod: {
      type: String,
    },
    lectureDuration: {
      type: Number,
    },
    projectDuration: {
      type: Number,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
