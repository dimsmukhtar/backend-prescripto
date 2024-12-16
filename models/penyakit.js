"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Penyakit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penyakit.hasMany(models.Aturan, {
        foreignKey: {
          name: "id_penyakit",
        },
      })
      Penyakit.hasMany(models.Diagnosa, {
        foreignKey: {
          name: "id_penyakit",
        },
      })
    }
  }
  Penyakit.init(
    {
      nama: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      solusi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Penyakit",
    }
  )
  return Penyakit
}
