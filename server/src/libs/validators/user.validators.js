const { check } = require("express-validator");
const bcrypt = require("bcrypt");

const validationMiddleware = require("../../middleware/validator.middleware");
const SYSTEM_ROLES = require("../constant/system-roles.constant");

const UserModel = require("../../models/user.model");

const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (email) => {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("Password must contain at least one letter and one number"),

  check("role")
    .optional()
    .isIn(Object.values(SYSTEM_ROLES))
    .withMessage("Invalid role value"),

  check("sales_capacity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sales capacity must be a non-negative integer")
    .custom((value, { req }) => {
      if (req.body.role === SYSTEM_ROLES.SALES && value === undefined) {
        throw new Error("Sales capacity is required for sales role");
      }
      return true;
    }),

  check("branch")
    .optional()
    .isMongoId()
    .withMessage("Branch must be a valid MongoDB ObjectId")
    .custom((value, { req }) => {
      if (
        (req.body.role === SYSTEM_ROLES.SALES ||
          req.body.role === SYSTEM_ROLES.FRONT_DESK) &&
        !value
      ) {
        throw new Error("Branch is required for sales or front desk role");
      }
      return true;
    }),

  validationMiddleware,
];

const loginUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const user = await UserModel.findOne({ email: req.body.email }).select(
        "+password",
      );

      // Always compare to prevent timing attacks that reveal valid emails
      const fakeHash =
        "$2b$12$000000000000000000000000000000000000000000000000000000";
      const isPasswordValid = await bcrypt.compare(
        password,
        user ? user.password : fakeHash,
      );

      if (!user || !isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      req.user = user;
      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createUserValidator,
  loginUserValidator,
};
