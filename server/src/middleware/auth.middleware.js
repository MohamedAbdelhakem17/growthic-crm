const asyncHandler = require("express-async-handler");

const AppError = require("../libs/utils/app-error");
const httpStatus = require("../libs/constant/http-status.constant");
const { verifyAccessToken } = require("../libs/utils/token-management");
const UserModel = require("../models/user.model");
const BlacklistedToken = require("../models/blacklisted-token.model");

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(
      401,
      httpStatus.FAIL,
      "You are not logged in. Please log in to get access",
      null,
    );
  }

  // Verify token first (cheap, in-memory) before hitting DB
  const decoded = verifyAccessToken(token);

  const isBlacklisted = await BlacklistedToken.findOne({ token }).lean();
  if (isBlacklisted) {
    throw new AppError(
      401,
      httpStatus.FAIL,
      "Token has been invalidated. Please log in again",
      null,
    );
  }

  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    throw new AppError(
      401,
      httpStatus.FAIL,
      "The user belonging to this token no longer exists",
      null,
    );
  }

  req.user = currentUser;
  next();
});

module.exports = isLoggedIn;
