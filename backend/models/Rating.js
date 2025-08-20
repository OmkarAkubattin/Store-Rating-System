const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = Rating;
