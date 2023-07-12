const { sequelize, Sequelize } = require("../../models")
const db = require("../../models")
const Ingredient = db.ingredient
const Utils = require("../../util/utilFunctions")

class ListIngredientService {
  static async getIngredients(req) {
    const {
      search,
      sort,
      sortBy,
      is_enabled,
      subtype_id,
      ingredient_type,
      all
    } = req.query
    const limit = req.query.limit ? _.toInteger(req.query.limit) : 10
    const page = req.query.page ? _.toInteger(req.query.page) : 1
    let sortingParams = ["ingredient_name", "ASC"]
    if (sort && sortBy) {
      sortingParams = [sortBy, sort]
    }
    const where = {}
    if (search) {
      where.ingredient_name = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("ingredient_name")),
        "LIKE",
        `%${search.toLowerCase()}%`
      )
    }
    if (is_enabled) {
      where.is_enabled = is_enabled
    }
    if (ingredient_type) {
      where.ingredient_type = ingredient_type
    }
    // const include = [
    //   {
    //     model: db.subType,
    //     attributes: []
    //   }
    // ]
    if (subtype_id) {
      where.subtype_id = subtype_id
    }
    if (all === "true") {
      return await Ingredient.findAll({
        attributes: ["id", "ingredient_name"],
        order: [sortingParams],
        where
      })
    }
    const options = {
      attributes: [
        "id",
        "ingredient_name",
        "ingredient_img",
        "ingredient_type",
        "producer",
        "description",
        "abv",
        "is_enabled"
        // [Sequelize.col("sub_type.subtype_name"), "subtype_name"]
      ],
      paginate: limit,
      order: [sortingParams],
      where,
      // include,
      page
    }
    return await Utils.paginator(Ingredient, options, page, limit)
  }
}
module.exports = ListIngredientService
