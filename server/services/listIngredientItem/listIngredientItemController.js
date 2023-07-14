const Utils = require('../../util/utilFunctions');
const ListIngredientItemService = require('./listIngredientItemService');

class ListIngredientItemController {
    static async getIngredientItems(req, res) {
        const data = await ListIngredientItemService.getIngredientItems(req);
        Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
    }
}

module.exports = ListIngredientItemController;
