const mongoose = require("mongoose");

const disqualifiedReasonSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
      minlength: [3, "Reason must be at least 3 characters long"],
      maxlength: [500, "Reason must be less than 500 characters long"],
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Disqualified reason must have a creator"],
      immutable: true,
    },
  },
  { timestamps: true },
);

// ─── Instance Methods ──────────────────────────────────

// Check if a user is the creator
disqualifiedReasonSchema.methods.isCreator = function (userId) {
  if (!userId) return false;
  return this.created_by._id.toString() === userId.toString();
};

// Clean response
disqualifiedReasonSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.created_by && obj.created_by._id) obj.creatorId = obj.created_by._id;
  delete obj.created_by;
  return obj;
};

const DisqualifiedReason = mongoose.model(
  "DisqualifiedReason",
  disqualifiedReasonSchema,
);

module.exports = DisqualifiedReason;
