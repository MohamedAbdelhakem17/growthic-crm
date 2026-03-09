const { check, param } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const SYSTEM_ROLES = require("../constant/system-roles.constant");
const DisqualifiedReasonsModel = require("../../models/disqualified-reasons.model");

const createDisqualifiedReasonValidator = [
  check("reason")
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 3 })
    .withMessage("Reason must be at least 3 characters long")
    .isLength({ max: 500 })
    .withMessage("Reason must be at most 500 characters long")
    .custom((value, { req }) => {
      if (req.user.role !== SYSTEM_ROLES.MANAGER) {
        throw new Error("Only managers can create disqualified reasons");
      }
      return true;
    }),

  validationMiddleware,
];

const updateDisqualifiedReasonValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid reason ID format")
    .custom(async (id, { req }) => {
      if (req.user.role !== SYSTEM_ROLES.MANAGER) {
        throw new Error("Only managers can update disqualified reasons");
      }

      const reason = await DisqualifiedReasonsModel.findById(id);
      if (!reason) {
        throw new Error("Disqualified reason not found");
      }

      return true;
    }),

  check("reason")
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 3 })
    .withMessage("Reason must be at least 3 characters long")
    .isLength({ max: 500 })
    .withMessage("Reason must be at most 500 characters long"),

  validationMiddleware,
];

const deleteDisqualifiedReasonValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid reason ID format")
    .custom(async (id, { req }) => {
      if (req.user.role !== SYSTEM_ROLES.MANAGER) {
        throw new Error("Only managers can delete disqualified reasons");
      }

      const reason = await DisqualifiedReasonsModel.findById(id);
      if (!reason) {
        throw new Error("Disqualified reason not found");
      }

      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createDisqualifiedReasonValidator,
  updateDisqualifiedReasonValidator,
  deleteDisqualifiedReasonValidator,
};
