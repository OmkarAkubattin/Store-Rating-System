const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");


// Associations
// Store-Owner
Store.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
User.hasOne(Store, { foreignKey: "ownerId", as: "store" });

// Store-Rating
Store.hasMany(Rating, { foreignKey: "storeId", as: "ratings" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

// User-Rating
User.hasMany(Rating, { foreignKey: "userId", as: "userRatings" });
Rating.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Store,
  Rating,
};
