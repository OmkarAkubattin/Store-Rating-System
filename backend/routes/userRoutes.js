const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

// Apply authentication middleware to all routes
router.use(authenticate);
router.use(authorize("user", "store_owner", "admin"));

// @route   GET /api/user/stores
// @desc    Get list of stores
// @access  Private
router.get("/stores", userController.listStores);

// @route   POST /api/user/ratings
// @desc    Submit a rating for a store
// @access  Private
router.post(
  "/ratings",
  [
    check("storeId", "Store ID is required").isInt(),
    check("rating", "Rating must be between 1 and 5").isInt({ min: 1, max: 5 }),
  ],
  validate,
  userController.submitRating
);

module.exports = router;
