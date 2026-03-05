const mongoose = require("mongoose");

const workTimeSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: [true, "Day is required"],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
      validate: {
        validator: function (value) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Start time must be in HH:mm format",
      },
    },
    end_time: {
      type: String,
      required: [true, "End time is required"],
      validate: {
        validator: function (value) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "End time must be in HH:mm format",
      },
    },
  },
  { timestamps: true },
);

// ─── Instance Methods ───────────────────────────────

// Check if start_time is before end_time
workTimeSchema.methods.isValidTimeRange = function () {
  const [startH, startM] = this.start_time.split(":").map(Number);
  const [endH, endM] = this.end_time.split(":").map(Number);
  return endH > startH || (endH === startH && endM > startM);
};

// Clean response
workTimeSchema.methods.toJSON = function () {
  return this.toObject();
};

const WorkTime = mongoose.model("WorkTime", workTimeSchema);

module.exports = WorkTime;
