"use strict"

const { INGREDIENT_TYPE } = require("../../server/util/constants")

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable("ingredient", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      ingredient_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ingredient_img: {
        type: Sequelize.STRING
      },
      ingredient_type: {
        type: Sequelize.ENUM(INGREDIENT_TYPE.TYPE),
        allowNull: false
      },
      subtype_id: {
        type: Sequelize.UUID,
        // foreignKey: true,
        // references: {
        //   model: "sub_types",
        //   key: "id"
        // }
      },
      producer: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      abv: {
        type: Sequelize.FLOAT,
        defaultValue: null
      },
      is_enabled: {
        type: Sequelize.INTEGER,
        enum: [0, 1],
        defaultValue: 1
      }
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable("ingredient")
  }
}
