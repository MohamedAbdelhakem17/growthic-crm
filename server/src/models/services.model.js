const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minlength: [2, "Service name must be at least 2 characters long"],
      maxlength: [100, "Service name must be less than 100 characters long"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// Generate slug before saving
serviceSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isModified("slug")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Instance Methods
serviceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
