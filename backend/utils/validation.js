/**
 * Validates a name (20-60 characters)
 * @param {string} name - The name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validateName = (name) => {
  return typeof name === "string" && name.length >= 20 && name.length <= 60;
};

/**
 * Validates a password (8-16 chars with at least one uppercase and one special char)
 * @param {string} password - The password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validatePassword = (password) => {
  if (typeof password !== "string") return false;
  if (password.length < 8 || password.length > 16) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasSpecialChar;
};

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && re.test(email);
};

/**
 * Validates an address (max 400 chars)
 * @param {string} address - The address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validateAddress = (address) => {
  return typeof address === "string" && address.length <= 400;
};

/**
 * Validates a rating (1-5)
 * @param {number} rating - The rating to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validateRating = (rating) => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

/**
 * Validates a role (admin, user, or store_owner)
 * @param {string} role - The role to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.validateRole = (role) => {
  return ["admin", "user", "store_owner"].includes(role);
};
