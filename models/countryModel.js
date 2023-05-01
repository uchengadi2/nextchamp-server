const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the country"],
    },
    code: {
      type: String,
      required: [false, "Please provide the country code"],
    },
    flag: {
      type: String,
      required: [false, "Please upload the country flag"],
    },
    description: {
      type: String,
      trim: true,
    },
    continent: {
      type: String,
      enum: ["africa", "europe", "asia", "north-america", "south-america"],
    },
    region: {
      type: String,
      enum: [
        "west",
        "north",
        "south",
        "east",
        "central",
        "south-east",
        "south-west",
        "south-central",
        "south-south",
        "north-east",
        "north-west",
        "north-central",
        "north-north",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
