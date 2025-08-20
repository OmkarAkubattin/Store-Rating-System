const { Store, Rating } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/db");

exports.listStores = async (req, res) => {
  const { search } = req.query;
  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ];
  }

  try {
    const stores = await Store.findAll({
      where,
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [
            [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
          ],
        },
      ],
      group: ["Store.id"],
      order: [["name", "ASC"]],
    });

    // Get user's ratings for these stores
    const userRatings = await Rating.findAll({
      where: { userId: req.user.id },
      attributes: ["storeId", "rating"],
    });

    const storesWithUserRating = stores.map((store) => {
      const userRating = userRatings.find((r) => r.storeId === store.id);
      return {
        ...store.toJSON(),
        userRating: userRating ? userRating.rating : null,
      };
    });

    res.json({
      success: true,
      data: storesWithUserRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  try {
    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({
      where: { userId, storeId },
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({
        success: true,
        data: existingRating,
      });
    }

    // Create new rating
    const newRating = await Rating.create({
      userId,
      storeId,
      rating,
    });

    res.status(201).json({
      success: true,
      data: newRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
