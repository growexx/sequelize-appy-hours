const { Op } = require('sequelize');
const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
const IngredientItem = db.ingredientItem;
const Size = db.size;
const Ingredient = db.ingredient;
const EditIngredientItemValidator = require('./editIngredientItemValidator');

class EditIngredientItemService {

    static async editIngredientItem(req, locale) {
        const { id, parent_ingredient, ingredient_price, sales_price } = req.body;
        const validator = new EditIngredientItemValidator(req.body, locale);
        validator.validateIngredientItem();
        const isIngredientItemIdExist = await IngredientItem.findOne({
            where: {
                id
            }
        });
        if (!isIngredientItemIdExist) {
            throw new GeneralError(locale('INGREDIENT_ITEM_NOT_EXISTS'), 400);
        }
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
                [Op.and]: [{ parent_ingredient }, { id: { [Op.ne]: id } }]
            }
        });
        if (isIngredientItemExist) {
            throw new GeneralError(locale('INGREDIENT_ITEM_ALREADY_EXISTS'), 400);
        }
        const updatedIngredientItem = {
            parent_ingredient,
            // size_id,
            ingredient_price,
            sales_price
        };
        return await IngredientItem.update(updatedIngredientItem, {
            where: {
                id
            }
        });
    }
}

module.exports = EditIngredientItemService;
