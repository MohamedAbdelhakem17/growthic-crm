const { check } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const SYSTEM_ROLES = require("../constant/system-roles.constant");

const createNoteValidator = [
  check("user")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID format")
    .custom((value, { req }) => {
      if (req.user.role !== SYSTEM_ROLES.SALES) {
        throw new Error("Only sales users can create notes");
      }
      return true;
    }),

  check("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be between 1 and 1000 characters long"),

  validationMiddleware,
];

module.exports = {
  createNoteValidator,
};
