
const GetIngredientService = require('./getIngredientService');
const Utils = require('../../util/utilFunctions');

class GetIngredientController {
    static async getIngredient(req, res) {
        try {
            const data = await GetIngredientService.getIngredient(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = GetIngredientController;
