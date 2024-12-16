"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.User, {
        foreignKey: {
          name: "id_user",
        },
      })
    }
  }
  Questions.init(
    {
      pertanyaan: DataTypes.STRING,
      jawaban: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Questions",
    }
  )
  return Questions
}
