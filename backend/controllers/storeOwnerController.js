const { Rating, User } = require("../models");
const sequelize = require("../config/db");


exports.getStoreRatings = async (req, res) => {
  try {
    // Find the store owned by this user
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
    });

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Get all ratings for this store
    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: ratings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStoreStats = async (req, res) => {
  try {
    // Find the store owned by this user
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
    });

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Get average rating
    const result = await Rating.findOne({
      where: { storeId: store.id },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalRatings"],
      ],
    });

    res.json({
      success: true,
      data: {
        store,
        averageRating: result.dataValues.averageRating || 0,
        totalRatings: result.dataValues.totalRatings || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
