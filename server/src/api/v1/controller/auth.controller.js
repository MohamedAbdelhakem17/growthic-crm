const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const UserModel = require("../../../models/user.model");
const BlacklistedToken = require("../../../models/blacklisted-token.model");

const {
  createAccessToken,
  decodeToken,
} = require("../../../libs/utils/token-management");

// @desc    Create a new user
// @route   POST /api/v1/auth/register
// @access  private (admin only)
const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, sales_capacity, branch } = req.body;

  const newUser = await UserModel.create({
    name,
    email,
    password,
    role,
    sales_capacity,
    branch,
  });

  if (!newUser) {
    throw new AppError(500, httpStatus.FAIL, "Failed to create user", null);
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "User created successfully",
    data: newUser,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { user } = req;

  const accessToken = createAccessToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch,
      },
      accessToken,
    },
  });
});

// @desc    Logout user
// @route   GET /api/v1/auth/logout
// @access  private (all authenticated users)
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = decodeToken(token);

  await BlacklistedToken.findOneAndUpdate(
    { token },
    { token, expiresAt: new Date(decoded.exp * 1000) },
    { upsert: true },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Logout successful",
    data: null,
  });
});

module.exports = {
  createNewUser,
  loginUser,
  logoutUser,
};
