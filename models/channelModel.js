const mongoose = require("mongoose");
const validator = require("validator");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the channel name"],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "professionals",
      enum: ["professionals", "academics", "life"],
    },

    image: {
      type: String,
      required: [false, "Please provide the image cover"],
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active"],
    },
    class: {
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
    slug: {
      type: String,
    },
    owner: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
