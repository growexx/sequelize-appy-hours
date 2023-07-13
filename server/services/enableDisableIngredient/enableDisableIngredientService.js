const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
const Ingredient = db.ingredient;
const EnableDisableIngredientValidator = require('./enableDisableIngredientValidator');

class EnableDisableIngredientService {
    static async enableDisableIngredient(req, locale) {
        const { id, is_enabled } = req.body;
        const validator = new EnableDisableIngredientValidator(req.body, locale);
        validator.validateIngredient();
        const isIngredientExist = await Ingredient.findOne(
            {
                where: {
                    id
                }
            });
        if (!isIngredientExist) {
            throw new GeneralError(locale('INGREDIENT_NOT_EXISTS'), 400);
        }
        const updatedIngredient = {
            is_enabled
        };
        return await Ingredient.update(
            updatedIngredient,
            {
                where: {
                    id
                }
            }
        );
    }
}

module.exports = EnableDisableIngredientService;
