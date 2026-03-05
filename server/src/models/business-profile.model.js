const mongoose = require("mongoose");
const slugify = require("slugify");

const { encrypt, decrypt } = require("../libs/utils/encryption");

const businessProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      minlength: [2, "Business name must be at least 2 characters long"],
      maxlength: [100, "Business name must be less than 100 characters long"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    sector: {
      type: String,
      required: [true, "Sector is required"],
      trim: true,
      maxlength: [100, "Sector must be less than 100 characters long"],
    },

    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
      maxlength: [10, "Currency code too long"],
    },

    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
      maxlength: [20, "Language name too long"],
    },

    whatsappNumber: {
      type: String,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Enter a valid WhatsApp number"],
    },

    whatsappApiKey: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// ─── Pre-save hook to generate slug  and encrypt whatsapp Api Key  ─────────────────────
businessProfileSchema.pre("save", function (next) {
  if (this.isModified("whatsappApiKey") && this.whatsappApiKey) {
    this.whatsappApiKey = encrypt(this.whatsappApiKey);
  }

  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

// ─── Instance Methods ───────────────────────────────
businessProfileSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

businessProfileSchema.methods.getWhatsappApiKey = function () {
  if (!this.whatsappApiKey) return null;
  return decrypt(this.whatsappApiKey);
};

const BusinessProfile = mongoose.model(
  "BusinessProfile",
  businessProfileSchema,
);

module.exports = BusinessProfile;
