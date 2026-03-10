const { check, param } = require("express-validator");

const validationMiddleware = require("../../middleware/validator.middleware");
const ServiceModel = require("../../models/services.model");

const createServiceValidator = [
  check("name")
    .notEmpty()
    .withMessage("Service name is required")
    .isLength({ min: 2 })
    .withMessage("Service name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Service name must be less than 100 characters long")
    .custom(async (name) => {
      const existing = await ServiceModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });
      if (existing) {
        throw new Error("A service with this name already exists");
      }
      return true;
    }),

  validationMiddleware,
];

const updateServiceValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid service ID format")
    .custom(async (id) => {
      const service = await ServiceModel.findById(id);
      if (!service) {
        throw new Error("Service not found");
      }
      return true;
    }),

  check("name")
    .notEmpty()
    .withMessage("Service name is required")
    .isLength({ min: 2 })
    .withMessage("Service name must be at least 2 characters long")
    .isLength({ max: 100 })
    .withMessage("Service name must be less than 100 characters long")
    .custom(async (name, { req }) => {
      const existing = await ServiceModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: req.params.id },
      });
      if (existing) {
        throw new Error("A service with this name already exists");
      }
      return true;
    }),

  validationMiddleware,
];

const deleteServiceValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid service ID format")
    .custom(async (id) => {
      const service = await ServiceModel.findById(id);
      if (!service) {
        throw new Error("Service not found");
      }
      return true;
    }),

  validationMiddleware,
];

const getServiceValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid service ID format")
    .custom(async (id) => {
      const service = await ServiceModel.findById(id);
      if (!service) {
        throw new Error("Service not found");
      }
      return true;
    }),

  validationMiddleware,
];

module.exports = {
  createServiceValidator,
  updateServiceValidator,
  deleteServiceValidator,
  getServiceValidator,
};
