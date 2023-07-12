"use strict"
const { INGREDIENT_TYPE } = require("../util/constants")
const sequelizePaginate = require("sequelize-paginate")
module.exports = function (sequelize, DataTypes) {
  const ingredientModel = sequelize.define(
    "ingredient",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      ingredient_name: {
        type: DataTypes.STRING
      },
      ingredient_img: {
        type: DataTypes.STRING
      },
      ingredient_type: {
        type: DataTypes.STRING,
        enum: INGREDIENT_TYPE.TYPE
      },
      subtype_id: {
        type: DataTypes.UUID
        // foreignKey: true,
        // references: {
        //   model: "sub_types",
        //   key: "id"
        // }
      },
      producer: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      abv: {
        type: DataTypes.FLOAT,
        defaultValue: null
      },
      is_enabled: {
        type: DataTypes.INTEGER,
        enum: [0, 1],
        defaultValue: 1
      }
    },
    {
      underscored: true,
      tableName: "ingredient"
    }
  )
  // ingredientModel.associate = function (models) {
  //   ingredientModel.hasOne(models.subType, {
  //     foreignKey: "id",
  //     sourceKey: "subtype_id"
  //   })
  // }
  sequelizePaginate.paginate(ingredientModel)
  return ingredientModel
}
