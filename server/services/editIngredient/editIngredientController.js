const EditIngredientService = require('./editIngredientService');
const Utils = require('../../util/utilFunctions');

class EditIngredientController {
    static async editIngredient(req, res) {
        try {
            const data = await EditIngredientService.editIngredient(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_EDIT_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = EditIngredientController;