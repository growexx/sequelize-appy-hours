
const EditIngredientItemService = require('./editIngredientItemService');
const Utils = require('../../util/utilFunctions');


class EditIngredientItemController {

    static async editIngredientItem(req, res) {
        try {
            const data = await EditIngredientItemService.editIngredientItem(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_ITEM_EDIT_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = EditIngredientItemController;
