const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        len: [1, 400],
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "store_owner"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
