const { check } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const BOOKING_STATUS = require("../constant/booking-status.constant");

const AppError = require("../utils/app-error");
const httpStatus = require("../constant/http-status.constant");
const LeadsModels = require("../../models/leads.model");

const createLeadValidator = [
  check("client_name")
    .notEmpty()
    .withMessage("Client name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Client name must be between 2 and 100 characters"),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  check("country")
    .notEmpty()
    .withMessage("Country is required")
    .isIn(["EG", "US", "SA", "AE"])
    .withMessage("Unsupported country"),
  check("service")
    .notEmpty()
    .withMessage("Service is required")
    .isMongoId()
    .withMessage("Invalid service ID format"),
  check("branch")
    .notEmpty()
    .withMessage("Branch is required")
    .isMongoId()
    .withMessage("Invalid branch ID format"),
  check("source")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Source must be less than 100 characters"),
  check("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes must be less than 500 characters"),
  check("status")
    .optional()
    .isIn(Object.values(BOOKING_STATUS))
    .withMessage("Invalid status value"),
  check("disQualifiedReason")
    .optional()
    .isMongoId()
    .withMessage("Invalid branch ID format"),

  validationMiddleware,
];

const updateLeadValidator = [
  check("status")
    .optional()
    .isIn(Object.values(BOOKING_STATUS))
    .withMessage("Invalid status value"),

  check("disQualifiedReason")
    .if((value, { req }) => req.body.status === BOOKING_STATUS.DISQUALIFIED)
    .notEmpty()
    .withMessage("Disqualified reason is required")
    .isMongoId()
    .withMessage("Invalid disqualified reason ID format"),

  validationMiddleware,
];

const getSingleLeadValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid lead ID format")
    .custom(async (id) => {
      const lead = await LeadsModels.findById(id);

      if (!lead) {
        throw new AppError(404, "Lead not found", httpStatus.FAIL, null);
      }

      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createLeadValidator,
  updateLeadValidator,
  getSingleLeadValidator,
};
