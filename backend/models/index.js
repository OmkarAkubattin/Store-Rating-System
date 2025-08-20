const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// Associations
Store.hasMany(Rating, { foreignKey: "storeId", as: "ratings" });
Rating.belongsTo(Store, { foreignKey: "storeId" });
User.hasMany(Rating, { foreignKey: "userId", as: "userRatings" });
Rating.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Store,
  Rating,
};
