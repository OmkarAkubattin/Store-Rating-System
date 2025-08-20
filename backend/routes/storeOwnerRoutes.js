const express = require("express");
const router = express.Router();
const storeOwnerController = require("../controllers/storeOwnerController");
const { authenticate, authorize } = require("../middleware/auth");

// Apply authentication and authorization middleware to all routes
router.use(authenticate);
router.use(authorize("store_owner"));

// @route   GET /api/store-owner/ratings
// @desc    Get ratings for the owner's store
// @access  Private (Store Owner)
router.get("/ratings", storeOwnerController.getStoreRatings);

// @route   GET /api/store-owner/stats
// @desc    Get store statistics
// @access  Private (Store Owner)
router.get("/stats", storeOwnerController.getStoreStats);

module.exports = router;
