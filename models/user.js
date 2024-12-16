"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Diagnosa, {
        foreignKey: {
          name: "id_user",
        },
      })
      User.hasMany(models.Questions, {
        foreignKey: {
          name: "id_user",
        },
      })
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM(["user", "pakar"]),
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      profileUrl: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpiresAt: DataTypes.DATE,
      verificationToken: DataTypes.STRING,
      verificationTokenExpiresAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
