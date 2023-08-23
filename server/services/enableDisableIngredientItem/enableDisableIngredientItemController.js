
const EnableDisableIngredientItemService = require('./enableDisableIngredientItemService');
const Utils = require('../../util/utilFunctions');


class EnableDisableIngredientItemController {

    static async enableDisableIngredientItem(req, res) {
        try {
            const data = await EnableDisableIngredientItemService.enableDisableIngredientItem(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_ITEM_EDIT_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = EnableDisableIngredientItemController;
