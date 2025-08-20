const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/auth");
const { User } = require("../models");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, address, role = "user" } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      address,
      role,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get current user info
const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { id, name, email, address, role } = req.user;
  res.json({ id, name, email, address, role });
};

module.exports = { register, login, changePassword, getMe };