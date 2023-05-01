const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the city"],
    },
    code: {
      type: String,
      required: [false],
    },
    description: {
      type: String,
      trim: true,
    },
    country: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    state: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "State",
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
citySchema.pre(/^find/, function (next) {
  this.populate({
    path: "country",
  });
  next();
});

const City = mongoose.model("City", citySchema);
module.exports = City;
