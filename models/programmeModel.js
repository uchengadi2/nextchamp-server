const mongoose = require("mongoose");
const validator = require("validator");

const programmeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the programme name"],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      required: [false, "Please provide the image cover"],
    },
    channel: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Channel",
      },
    ],
    status: {
      type: String,
      default: "public",
      enum: ["public", "private"],
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
    duration: {
      type: String,
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
    tracks: {
      type: String,
      enum: ["weekdays", "weekends", "weekdays/weekends"],
    },
    averageNextChampGradePoint: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

const Programme = mongoose.model("Programme", programmeSchema);
module.exports = Programme;
