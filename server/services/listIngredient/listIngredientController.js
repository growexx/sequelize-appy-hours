const ListIngredientService = require("./listIngredientService")
const Utils = require("../../util/utilFunctions")

class ListIngredientController {
  static async getIngredients(req, res) {
    const data = await ListIngredientService.getIngredients(req)
    Utils.sendResponse(null, data, res, MESSAGES.SUCCESS)
  }
}

module.exports = ListIngredientController
