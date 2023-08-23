const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
const IngredientItem = db.ingredientItem;
const EnableDisableIngredientItemValidator = require('./enableDisableIngredientItemValidator');

class EnableDisableIngredientItemService {
    static async enableDisableIngredientItem(req, locale) {
        const { id, is_enabled } = req.body;
        const validator = new EnableDisableIngredientItemValidator(req.body, locale);
        validator.validateIngredientItem();
        const isIngredientItemExist = await IngredientItem.findOne(
            {
                where: {
                    id
                }
            });
        if (!isIngredientItemExist) {
            throw new GeneralError(locale('INGREDIENT_ITEM_NOT_EXISTS'), 400);
        }
        const updatedIngredientItem = {
            is_enabled
        };
        return await IngredientItem.update(
            updatedIngredientItem,
            {
                where: {
                    id
                }
            }
        );
    }
}

module.exports = EnableDisableIngredientItemService;
