const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { User } = require("../models");

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Find user
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
  };
};
