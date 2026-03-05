const mongoose = require("mongoose");
const slugify = require("slugify");
const SYSTEM_ROLES = require("../libs/constant/system-roles.constant");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch name is required"],
      trim: true,
      minlength: [2, "Branch name must be at least 2 characters long"],
      maxlength: [100, "Branch name must be less than 100 characters long"],
    },

    slug: {
      type: String,
      required: [true, "Branch slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [2, "Branch slug must be at least 2 characters long"],
      maxlength: [100, "Branch slug must be less than 100 characters long"],
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Branch slug must be URL-friendly"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [255, "Branch location must be less than 255 characters long"],
    },

    front_desk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Branch must have a front desk user"],
      validate: {
        validator: async function (userId) {
          const User = mongoose.model("User");
          const user = await User.findById(userId);
          return user && user.role === SYSTEM_ROLES.FRONT_DESK;
        },
        message: "Front desk user must have the role FRONT_DESK",
      },
    },

    work_times: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkTime",
      },
    ],
  },
  { timestamps: true },
);

// Pre-save hook to generate slug from name
branchSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isModified("slug")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Populate front desk details automatically
branchSchema.pre(/^find/, function (next) {
  this.populate({
    path: "front_desk",
    select: "name email role _id",
  });
  next();
});

// ─── Instance Methods ───────────────────────────────

// Check if a user is the front desk for this branch
branchSchema.methods.isFrontDesk = function (userId) {
  if (!userId || !this.front_desk) return false;
  return this.front_desk._id.toString() === userId.toString();
};

// Clean response
branchSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.front_desk && obj.front_desk._id)
    obj.frontDeskId = obj.front_desk._id;
  delete obj.front_desk;
  return obj;
};

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
