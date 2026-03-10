const { check, param } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const SYSTEM_ROLES = require("../constant/system-roles.constant");
const BranchModel = require("../../models/branches.model");
const UserModel = require("../../models/user.model");

const createBranchValidator = [
  check("name")
    .notEmpty()
    .withMessage("Branch name is required")
    .isLength({ min: 2 })
    .withMessage("Branch name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Branch name must be less than 100 characters long"),

  check("location")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Branch location must be less than 255 characters long"),

  check("front_desk")
    .notEmpty()
    .withMessage("At least one front desk user is required")
    .isArray({ min: 1 })
    .withMessage("front_desk must be a non-empty array")
    .custom(async (userIds) => {
      const mongoIdRegex = /^[a-f\d]{24}$/i;
      if (userIds.some((id) => !mongoIdRegex.test(id))) {
        throw new Error("One or more front desk user IDs are invalid");
      }

      const users = await UserModel.find({ _id: { $in: userIds } });

      if (users.length !== userIds.length) {
        throw new Error("One or more front desk users were not found");
      }

      if (users.some((u) => u.role !== SYSTEM_ROLES.FRONT_DESK)) {
        throw new Error("All front desk users must have the FRONT_DESK role");
      }

      return true;
    }),

  validationMiddleware,
];

const updateBranchValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid branch ID format")
    .custom(async (id) => {
      const branch = await BranchModel.findById(id);
      if (!branch) {
        throw new Error("Branch not found");
      }
      return true;
    }),

  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Branch name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Branch name must be less than 100 characters long"),

  check("location")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Branch location must be less than 255 characters long"),

  check("front_desk")
    .optional()
    .isArray({ min: 1 })
    .withMessage("front_desk must be a non-empty array")
    .custom(async (userIds) => {
      if (!userIds) return true;

      const mongoIdRegex = /^[a-f\d]{24}$/i;
      if (userIds.some((id) => !mongoIdRegex.test(id))) {
        throw new Error("One or more front desk user IDs are invalid");
      }

      const users = await UserModel.find({ _id: { $in: userIds } });

      if (users.length !== userIds.length) {
        throw new Error("One or more front desk users were not found");
      }

      if (users.some((u) => u.role !== SYSTEM_ROLES.FRONT_DESK)) {
        throw new Error("All front desk users must have the FRONT_DESK role");
      }

      return true;
    }),

  validationMiddleware,
];

const deleteBranchValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid branch ID format")
    .custom(async (id) => {
      const branch = await BranchModel.findById(id);
      if (!branch) {
        throw new Error("Branch not found");
      }
      return true;
    }),

  validationMiddleware,
];

const getBranchValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid branch ID format")
    .custom(async (id) => {
      const branch = await BranchModel.findById(id);
      if (!branch) {
        throw new Error("Branch not found");
      }
      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createBranchValidator,
  updateBranchValidator,
  deleteBranchValidator,
  getBranchValidator,
};
