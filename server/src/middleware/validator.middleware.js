const { validationResult } = require("express-validator");

const AppError = require("../utils/app-error");
const httpStatus = require("../constant/http-status.constant");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(
      400,
      httpStatus.FAIL,
      "Validation Failed",
      errors.array(),
    );
  }
  next();
};

module.exports = validatorMiddleware;
