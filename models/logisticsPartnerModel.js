const mongoose = require("mongoose");
const validator = require("validator");

const logisticsPartnerSchema = new mongoose.Schema(
  {
    partnerNumber: {
      type: String,
      required: [true, "Please provide the name of a vendor"],
    },
    name: {
      type: String,
      required: [false, "Please provide the name of a vendor"],
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "corporate",
      enum: ["corporate", "individual"],
    },
    logo: {
      type: String,
      required: [false, "Please provide the logo of this vendor"],
    },
    partnerCountry: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    partnerState: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    location: {
      locationAddress: String,
      locationCity: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "City",
        },
      ],
      locationState: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "State",
        },
      ],
      locationCountry: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Country",
        },
      ],
      //locationCoordinates: [Number],
      // locationLatitude: Number,
      // locationLongititde: Number,
      officePhoneNumber: String,
    },

    contactPerson: {
      contactPersonName: {
        type: String,
      },
      contactPersonPhoneNumber: [String],
      contactPersonEmailAddress: String,
    },
    bankDetails: {
      bankName: {
        type: String,
        required: [false, "Please provide your bank's name"],
      },
      bankAccountNumber: {
        type: String,
        required: [false, "Please provide your bank's account number"],
      },
      bankAccountType: {
        type: String,
        default: "current",
        enum: ["savings", "current", "domicilary"],
      },
      bankAccountName: {
        type: String,
        required: [false, "Please provide the bank's account name"],
      },
      bankCountry: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Country",
        },
      ],
      bankAccountSwiftCode: {
        type: String,
        required: [false, "Please provide the bank's swift code"],
      },
      bankAccountIBAN: {
        type: String,
        required: [false, "Please provide the bank's IBAN number"],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const LogisticsPartner = mongoose.model(
  "LogisticsPartner",
  logisticsPartnerSchema
);
module.exports = LogisticsPartner;
