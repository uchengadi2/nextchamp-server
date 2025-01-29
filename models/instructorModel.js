const mongoose = require("mongoose");
const validator = require("validator");

const instructorSchema = new mongoose.Schema(
  {
    refNumber: {
      type: String,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please provide the instructor name"],
      unique: true,
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    qualifications: {
      type: String,
      trim: true,
    },
    skills: {
      type: String,
      trim: true,
    },
    experiences: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
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
    slug: {
      type: String,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active", "suspended", "dismissed"],
    },
    image: {
      type: String,
      required: [false, "Please provide the image cover"],
    },
    accountDetails: {
      type: String,
    },
    linkedInProfile: {
      type: String,
    },
    gitHubProfile: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

instructorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
