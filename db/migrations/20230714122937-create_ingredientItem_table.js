"use strict"

const { INGREDIENT_TYPE } = require("../../server/util/constants")

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("ingredient_items", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      parent_ingredient: {
        type: DataTypes.UUID,
        foreignKey: true,
        references: {
          model: 'ingredient',
          key: 'id'
        }
      },
      // size_id: {
      //     type: DataTypes.UUID,
      //     foreignKey: true,
      //     references: {
      //         model: 'sizes',
      //         key: 'id'
      //     }
      // },
      ingredient_price: {
        type: DataTypes.FLOAT
      },
      sales_price: {
        type: DataTypes.FLOAT
      },
      is_enabled: {
        type: DataTypes.INTEGER,
        enum: [0, 1],
        defaultValue: 1
      }
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable("ingredient_items")
  }
}
