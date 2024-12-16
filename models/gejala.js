"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Gejala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gejala.hasMany(models.Aturan, {
        foreignKey: {
          name: "id_gejala",
        },
      })
    }
  }
  Gejala.init(
    {
      nama: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gejala",
    }
  )
  return Gejala
}
