const AddIngredientItemService = require('./addIngredientItemService');
const Utils = require('../../util/utilFunctions');

class AddIngredientItemController {
    static async addIngredientItem(req, res) {
        try {
            const data = await AddIngredientItemService.addIngredientItem(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.INGREDIENT_ITEM_ADD_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AddIngredientItemController;
