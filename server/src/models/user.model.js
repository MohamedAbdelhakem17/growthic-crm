const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");
const SYSTEM_ROLES = require("../libs/constant/system-roles.constant");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email) => isEmail(email),
        message: "Email must be valid",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(SYSTEM_ROLES),
      default: SYSTEM_ROLES.SALES,
    },

    sales_capacity: {
      type: Number,
      default: 0,
      required: function () {
        return this.role === SYSTEM_ROLES.SALES;
      },
      validate: [
        {
          validator: function (value) {
            return value >= 0;
          },
          message: "Sales capacity must be a non-negative number",
        },
        {
          validator: function (value) {
            if (this.role === SYSTEM_ROLES.SALES) {
              return Number.isInteger(value);
            }
            return true;
          },
          message: "Sales capacity must be an integer",
        },
      ],
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return (
          this.role === SYSTEM_ROLES.FRONT_DESK ||
          this.role === SYSTEM_ROLES.SALES
        );
      },
    },
  },
  { timestamps: true },
);

// ─── Pre-save middleware ───────────────────────────────

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Populate branch details automatically
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "branch",
    select: "name location",
  });
  next();
});

// ─── Instance methods ────────────────────────────────

// Compare candidate password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields when sending response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
