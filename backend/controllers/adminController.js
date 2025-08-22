const { User, Store, Rating } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

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

    res.status(201).json({
      success: true,
      data: {
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

exports.listUsers = async (req, res) => {
  const { search, role } = req.query;
  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ];
  }

  if (role) {
    where.role = role;
  }

  try {
    const users = await User.findAll({
      where,
      attributes: ["id", "name", "email", "address", "role", "createdAt"],
      order: [["name", "ASC"]],
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "address", "role", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user is a store owner, get their store details
    if (user.role === "store_owner") {
      const store = await Store.findOne({
        where: { ownerId: user.id },
        attributes: ["id", "name", "email", "address"],
      });

      // If no store, return with store: null and averageRating: 0
      if (!store) {
        return res.json({
          success: true,
          data: {
            ...user.toJSON(),
            store: null,
            averageRating: 0,
          },
        });
      }

      const ratings = await Rating.findAll({
        where: { storeId: store.id },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
        ],
      });
      const averageRating = ratings[0]?.dataValues.averageRating || 0;

      return res.json({
        success: true,
        data: {
          ...user.toJSON(),
          store,
          averageRating,
        },
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  try {
    // Verify owner exists and is a store owner
    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== "store_owner") {
      return res.status(400).json({ error: "Invalid store owner" });
    }

    // Check if store email already exists
    const existingStore = await Store.findOne({ where: { email } });
    if (existingStore) {
      return res.status(400).json({ error: "Store email already in use" });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.listStores = async (req, res) => {
  const { search } = req.query;
  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ];
  }

  try {
    const stores = await Store.findAll({
      where,
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT AVG(rating)
              FROM Ratings AS rating
              WHERE rating.storeId = Store.id
            )`),
            "averageRating",
          ],
        ],
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["name", "ASC"]],
    });

    res.json({
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
