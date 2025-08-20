const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const adminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

// Apply authentication and authorization middleware to all routes
router.use(authenticate);
router.use(authorize("admin"));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin)
router.get("/dashboard", adminController.getDashboardStats);

// @route   POST /api/admin/users
// @desc    Create a new user
// @access  Private (Admin)
router.post(
  "/users",
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
    check("role", "Invalid role").isIn(["admin", "user", "store_owner"]),
  ],
  validate,
  adminController.createUser
);

// @route   GET /api/admin/users
// @desc    Get list of users
// @access  Private (Admin)
router.get("/users", adminController.listUsers);

// @route   GET /api/admin/users/:id
// @desc    Get user details
// @access  Private (Admin)
router.get("/users/:id", adminController.getUserDetails);

// @route   POST /api/admin/stores
// @desc    Create a new store
// @access  Private (Admin)
router.post(
  "/stores",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("address", "Address is required").notEmpty(),
    check("ownerId", "Owner ID is required").isInt(),
  ],
  validate,
  adminController.createStore
);

// @route   GET /api/admin/stores
// @desc    Get list of stores
// @access  Private (Admin)
router.get("/stores", adminController.listStores);

module.exports = router;
