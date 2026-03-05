const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Note must belong to a user"],
      immutable: true,
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
      minlength: [1, "Note content must be at least 1 character long"],
      maxlength: [1000, "Note content must be less than 1000 characters long"],
    },
  },
  { timestamps: true },
);

// ─── Populate user details automatically ───────────────
noteSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name _id",
  });
  next();
});

// ─── Instance Methods ──────────────────────────────────

// Check if the note belongs to a specific user
noteSchema.methods.isOwner = function (userId) {
  if (!userId) return false;
  return this.user._id.toString() === userId.toString();
};

// Remove sensitive fields before sending response
noteSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.user && obj.user._id) obj.userId = obj.user._id;
  delete obj.user;
  return obj;
};

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
