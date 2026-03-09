const AppError = require("../libs/utils/app-error");
const httpStatus = require("../libs/constant/http-status.constant");

const allowedTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError(
      403,
      httpStatus.FAIL,
      "You do not have permission to perform this action",
      null,
    );
  }
  next();
};

module.exports = allowedTo;
