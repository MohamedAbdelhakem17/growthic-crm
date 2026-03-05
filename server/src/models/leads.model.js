const mongoose = require("mongoose");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const BOOKING_STATUS = require("../libs/constant/booking-status.constant");

const allowedCountries = ["EG", "US", "SA", "AE"];

const leadsSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: [2, "Client name must be at least 2 characters"],
      maxlength: [100, "Client name must be less than 100 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    country: {
      type: String,
      enum: {
        values: allowedCountries,
        message: "Unsupported country",
      },
      required: [true, "Country is required"],
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Branch is required"],
      index: true,
    },

    source: {
      type: String,
      trim: true,
      maxlength: [100, "Source must be less than 100 characters"],
      default: "call",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes must be less than 500 characters"],
    },

    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
      index: true,
    },

    disQualifiedReason: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DisqualificationReason",
      required: function () {
        return this.status === BOOKING_STATUS.DISQUALIFIED;
      },
    },
  },
  {
    timestamps: true,
  },
);

leadsSchema.pre("save", function (next) {
  if (this.isModified("phone") || this.isModified("country")) {
    const phoneNumber = parsePhoneNumberFromString(this.phone, this.country);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return next(new Error("Invalid phone number"));
    }

    // Store as E.164 format
    this.phone = phoneNumber.number; // +201001234567
  }

  next();
});

leadsSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "service", select: "name _id" },
    { path: "branch", select: "name _id" },
    { path: "disQualifiedReason", select: "reason _id" },
  ]);
  next();
});

leadsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Lead = mongoose.model("Lead", leadsSchema);

module.exports = Lead;
