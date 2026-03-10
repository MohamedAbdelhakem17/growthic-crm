const { check, param } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const BusinessProfileModel = require("../../models/business-profile.model");

const createBusinessProfileValidator = [
  check("name")
    .notEmpty()
    .withMessage("Business name is required")
    .isLength({ min: 2 })
    .withMessage("Business name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Business name must be less than 100 characters long")
    .custom(async () => {
      const existing = await BusinessProfileModel.findOne();
      if (existing) {
        throw new Error(
          "A business profile already exists. Use update instead",
        );
      }
      return true;
    }),

  check("sector")
    .notEmpty()
    .withMessage("Sector is required")
    .isLength({ max: 100 })
    .withMessage("Sector must be less than 100 characters long"),

  check("currency")
    .notEmpty()
    .withMessage("Currency is required")
    .isLength({ max: 10 })
    .withMessage("Currency code must be less than 10 characters"),

  check("language")
    .notEmpty()
    .withMessage("Language is required")
    .isLength({ max: 20 })
    .withMessage("Language name must be less than 20 characters"),

  check("whatsappNumber")
    .optional()
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Enter a valid WhatsApp number"),

  check("whatsappApiKey").optional().isString().withMessage("Invalid API key"),

  validationMiddleware,
];

const updateBusinessProfileValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid business profile ID format")
    .custom(async (id) => {
      const profile = await BusinessProfileModel.findById(id);
      if (!profile) {
        throw new Error("Business profile not found");
      }
      return true;
    }),

  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Business name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Business name must be less than 100 characters long"),

  check("sector")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Sector must be less than 100 characters long"),

  check("currency")
    .optional()
    .isLength({ max: 10 })
    .withMessage("Currency code must be less than 10 characters"),

  check("language")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Language name must be less than 20 characters"),

  check("whatsappNumber")
    .optional()
    .matches(/^\+?\d{10,15}$/)
    .withMessage("Enter a valid WhatsApp number"),

  check("whatsappApiKey").optional().isString().withMessage("Invalid API key"),

  validationMiddleware,
];

module.exports = {
  createBusinessProfileValidator,
  updateBusinessProfileValidator,
};
