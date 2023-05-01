const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    year: Number,
    day: [
      {
        daysDate: Date,
        holidayType: String,
        holidayDescription: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Holiday = mongoose.model("Holiday", holidaySchema);
module.exports = Holiday;
