class AppError extends Error {
  constructor(statusCode, statusText, message, errors) {
    super();
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message;
    this.errors = errors || null;
  }
}

module.exports = AppError;
