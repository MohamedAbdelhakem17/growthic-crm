const jwt = require("jsonwebtoken");
const AppError = require("./app-error");
const HTTP_STATUS_TEXT = require("../constant/http-status.constant");

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN = "15m",
  JWT_REFRESH_EXPIRES_IN = "7d",
  JWT_ISSUER,
  JWT_AUDIENCE,
} = process.env;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new AppError(
    500,
    HTTP_STATUS_TEXT.ERROR,
    "JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables",
    null,
  );
}

/**
 * Signs a token with the given secret and options.
 * @param {object} payload - Data to embed in the token.
 * @param {string} secret
 * @param {string|number} expiresIn
 * @returns {string} Signed JWT.
 */
const signToken = (payload, secret, expiresIn) => {
  if (!payload || typeof payload !== "object") {
    throw new AppError(
      500,
      HTTP_STATUS_TEXT.ERROR,
      "Token payload must be a non-null object",
      null,
    );
  }
  return jwt.sign(payload, secret, {
    expiresIn,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
};

/**
 * Verifies a token and returns the decoded payload.
 * Throws an AppError with a descriptive message on failure.
 * @param {string} token
 * @param {string} secret
 * @returns {object} Decoded JWT payload.
 */
const verifyToken = (token, secret) => {
  if (!token || typeof token !== "string") {
    throw new AppError(
      401,
      HTTP_STATUS_TEXT.FAIL,
      "Token must be a non-empty string",
      null,
    );
  }
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError(401, HTTP_STATUS_TEXT.FAIL, "Token has expired", null);
    }
    if (err.name === "JsonWebTokenError") {
      throw new AppError(401, HTTP_STATUS_TEXT.FAIL, "Invalid token", null);
    }
    throw new AppError(
      401,
      HTTP_STATUS_TEXT.FAIL,
      "Token verification failed",
      null,
    );
  }
};

// ─── Access Token ──────────────────────────────────────────────────────────────

const createAccessToken = (payload, expiresIn = JWT_ACCESS_EXPIRES_IN) =>
  signToken(payload, JWT_SECRET, expiresIn);

const verifyAccessToken = (token) => verifyToken(token, JWT_SECRET);

// ─── Refresh Token ─────────────────────────────────────────────────────────────

const createRefreshToken = (payload, expiresIn = JWT_REFRESH_EXPIRES_IN) =>
  signToken(payload, JWT_REFRESH_SECRET, expiresIn);

const verifyRefreshToken = (token) => verifyToken(token, JWT_REFRESH_SECRET);

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Decodes a token without verifying its signature.
 * Useful for inspecting an expired token's payload.
 * @param {string} token
 * @returns {object|null}
 */
const decodeToken = (token) => jwt.decode(token);

/**
 * Returns the expiration Date object of a token, or null if not present.
 * @param {string} token
 * @returns {Date|null}
 */
const getTokenExpiry = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) return null;
  return new Date(decoded.exp * 1000);
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  decodeToken,
  getTokenExpiry,
};
