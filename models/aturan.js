"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Aturan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aturan.belongsTo(models.Penyakit, {
        foreignKey: {
          name: "id_penyakit",
        },
      })

      Aturan.belongsTo(models.Gejala, {
        foreignKey: {
          name: "id_gejala",
        },
      })
    }
  }
  Aturan.init(
    {
      id_penyakit: DataTypes.STRING,
      id_gejala: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Aturan",
    }
  )
  return Aturan
}
