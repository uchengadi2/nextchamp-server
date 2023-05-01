const mongoose = require("mongoose");

const clusterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the cluster"],
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "city",
      enum: ["city", "state", "country"],
    },
    city: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "City",
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

const Cluster = mongoose.model("Cluster", clusterSchema);
module.exports = Cluster;
