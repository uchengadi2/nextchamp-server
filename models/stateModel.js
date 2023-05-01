const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the state"],
    },
    code: {
      type: String,
      required: [false, "Please provide the state code"],
    },
    description: {
      type: String,
      trim: true,
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
    country: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
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

//QUERY MIDDLEWARE
stateSchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

const State = mongoose.model("State", stateSchema);
module.exports = State;
