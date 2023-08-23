
const GetIngredientItemService = require('./getIngredientItemService');
const Utils = require('../../util/utilFunctions');

class GetIngredientItemController {
    static async getIngredientItem(req, res) {
        try {
            const data = await GetIngredientItemService.getIngredientItem(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = GetIngredientItemController;
