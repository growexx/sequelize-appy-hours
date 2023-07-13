
const AddIngredientService = require('./addIngredientService');
const Utils = require('../../util/utilFunctions');

class AddIngredientController {
    static async addIngredient(req, res) {
        try {
            const data = await AddIngredientService.addIngredient(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_ADD_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AddIngredientController;
