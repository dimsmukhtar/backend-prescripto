"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Diagnosa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Diagnosa.belongsTo(models.User, {
        foreignKey: {
          name: "id_user",
        },
      })

      Diagnosa.belongsTo(models.Penyakit, {
        foreignKey: {
          name: "id_penyakit",
        },
      })
    }
  }
  Diagnosa.init(
    {
      id_user: DataTypes.INTEGER,
      id_penyakit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Diagnosa",
    }
  )
  return Diagnosa
}
