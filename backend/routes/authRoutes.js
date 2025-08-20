const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  register,
  login,
  changePassword,
  getMe,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

// @route   GET /api/auth/me
// @desc    Get current user info
// @access  Private
router.get("/me", authenticate, getMe);
const { validate } = require("../middleware/validate");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name must be between 20 and 60 characters").isLength({
      min: 20,
      max: 60,
    }),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be 8-16 characters with at least one uppercase and one special character"
    )
      .isLength({ min: 8, max: 16 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/),
    check("address", "Address must be less than 400 characters").isLength({
      max: 400,
    }),
  ],
  validate,
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  validate,
  login
);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put(
  "/change-password",
  [
    check("currentPassword", "Current password is required").exists(),
    check(
      "newPassword",
      "Password must be 8-16 characters with at least one uppercase and one special character"
    )
      .isLength({ min: 8, max: 16 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/),
  ],
  validate,
  changePassword
);

module.exports = router;
