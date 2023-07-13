
const EnableDisableIngredientService = require('./enableDisableIngredientService');
const Utils = require('../../util/utilFunctions');

class EnableDisableIngredientController {
    static async enableDisableIngredient(req, res) {
        try {
            const data = await EnableDisableIngredientService.enableDisableIngredient(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_EDIT_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = EnableDisableIngredientController;
