const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  createNewUser,
  loginUser,
  logoutUser,
} = require("../controller/auth.controller");

const {
  createUserValidator,
  loginUserValidator,
} = require("../../../libs/validators/user.validators");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");
const httpStatus = require("../../../libs/constant/http-status.constant");

const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const loginLimiter = rateLimit({
  windowMs: LOGIN_WINDOW_MS,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const minutes = Math.ceil(LOGIN_WINDOW_MS / 60000);
    res.status(429).json({
      status: httpStatus.FAIL,
      message: `Too many login attempts, please try again after ${minutes} minutes`,
      errors: null,
    });
  },
});

const router = express.Router();

router.post("/login", loginLimiter, loginUserValidator, loginUser);

// Protected routes (must be logged in)
router.use(isLoggedIn);

router.get("/logout", logoutUser);
router.post(
  "/create-user",
  allowedTo(SYSTEM_ROLES.MANAGER),
  createUserValidator,
  createNewUser,
);

module.exports = router;
