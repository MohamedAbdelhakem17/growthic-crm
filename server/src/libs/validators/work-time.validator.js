const { check, param } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const WorkTimeModel = require("../../models/work-time.model");

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createWorkTimeValidator = [
  check("day")
    .notEmpty()
    .withMessage("Day is required")
    .isIn(DAYS)
    .withMessage(`Day must be one of: ${DAYS.join(", ")}`),

  check("start_time")
    .notEmpty()
    .withMessage("Start time is required")
    .matches(TIME_REGEX)
    .withMessage("Start time must be in HH:mm format"),

  check("end_time")
    .notEmpty()
    .withMessage("End time is required")
    .matches(TIME_REGEX)
    .withMessage("End time must be in HH:mm format")
    .custom((end_time, { req }) => {
      const { start_time } = req.body;
      if (!start_time || !TIME_REGEX.test(start_time)) return true;
      const [startH, startM] = start_time.split(":").map(Number);
      const [endH, endM] = end_time.split(":").map(Number);
      const isValid = endH > startH || (endH === startH && endM > startM);
      if (!isValid) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),

  validationMiddleware,
];

const updateWorkTimeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid work time ID format")
    .custom(async (id) => {
      const workTime = await WorkTimeModel.findById(id);
      if (!workTime) {
        throw new Error("Work time not found");
      }
      return true;
    }),

  check("day")
    .optional()
    .isIn(DAYS)
    .withMessage(`Day must be one of: ${DAYS.join(", ")}`),

  check("start_time")
    .optional()
    .matches(TIME_REGEX)
    .withMessage("Start time must be in HH:mm format"),

  check("end_time")
    .optional()
    .matches(TIME_REGEX)
    .withMessage("End time must be in HH:mm format")
    .custom((end_time, { req }) => {
      const { start_time } = req.body;
      if (!start_time || !TIME_REGEX.test(start_time)) return true;
      const [startH, startM] = start_time.split(":").map(Number);
      const [endH, endM] = end_time.split(":").map(Number);
      const isValid = endH > startH || (endH === startH && endM > startM);
      if (!isValid) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),

  validationMiddleware,
];

const deleteWorkTimeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid work time ID format")
    .custom(async (id) => {
      const workTime = await WorkTimeModel.findById(id);
      if (!workTime) {
        throw new Error("Work time not found");
      }
      return true;
    }),

  validationMiddleware,
];

const getWorkTimeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid work time ID format")
    .custom(async (id) => {
      const workTime = await WorkTimeModel.findById(id);
      if (!workTime) {
        throw new Error("Work time not found");
      }
      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createWorkTimeValidator,
  updateWorkTimeValidator,
  deleteWorkTimeValidator,
  getWorkTimeValidator,
};
