const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

/**
 * Generates a JWT token
 * @param {object} payload - The payload to include in the token
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - The generated JWT token
 */
exports.generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

/**
 * Formats error messages for consistent API responses
 * @param {string} message - The error message
 * @param {number} statusCode - HTTP status code
 * @param {object} details - Additional error details
 * @returns {object} - Formatted error response
 */
exports.formatError = (message, statusCode = 400, details = {}) => {
  return {
    success: false,
    error: {
      message,
      statusCode,
      ...details,
    },
  };
};

/**
 * Formats success responses for consistent API responses
 * @param {object} data - The response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 * @returns {object} - Formatted success response
 */
exports.formatResponse = (data, message = "Success", statusCode = 200) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
exports.capitalize = (str) => {
  if (typeof str !== "string") return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Truncates a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length
 * @param {string} ending - What to append if truncated
 * @returns {string} - The truncated string
 */
exports.truncate = (str, length = 100, ending = "...") => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

/**
 * Sanitizes input by removing potentially harmful characters
 * @param {string} input - The input to sanitize
 * @returns {string} - The sanitized input
 */
exports.sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

/**
 * Generates a random string of specified length
 * @param {number} length - Length of the random string
 * @returns {string} - The generated string
 */
exports.generateRandomString = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
