const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
const IngredientItem = db.ingredientItem;
const Size = db.size;
const Ingredient = db.ingredient;
const AddIngredientItemValidator = require('./addIngredientItemValidator');

class AddIngredientItemService {

    static async addIngredientItem(req, locale) {
        const { parent_ingredient, ingredient_price, sales_price } = req.body;
        const validator = new AddIngredientItemValidator(req.body, locale);
        await validator.validateIngredientItem();
        // const isSizeExist = await Size.findOne({
        //     where: {
        //         id: size_id
        //     }
        // });
        // if (!isSizeExist) {
        //     throw new GeneralError(locale('SIZE_NOT_EXISTS'), 400);
        // }
        const isIngredientExist = await Ingredient.findOne({
            where: {
                id: parent_ingredient
            }
        });
        if (!isIngredientExist) {
            throw new GeneralError(locale('INGREDIENT_NOT_EXISTS'), 400);
        }
        const isIngredientItemExist = await IngredientItem.findOne({
            where: {
                parent_ingredient
                // size_id
            }
        });
        if (isIngredientItemExist) {
            throw new GeneralError(locale('INGREDIENT_ITEM_ALREADY_EXISTS'), 400);
        }
        return await IngredientItem.create({
            parent_ingredient,
            // size_id,
            ingredient_price,
            sales_price
        });
    }
}

module.exports = AddIngredientItemService;
