const { Op } = require('sequelize');
const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
// const UploadService = require('../../util/uploadService');
const Ingredient = db.ingredient;
const EditIngredientValidator = require('./editIngredientValidator');

class EditIngredientService {

    static async editIngredient(req, locale) {
        const { ingredient_name, ingredient_type, subtype_id, producer, description, abv, id } = req.body;
        const validator = new EditIngredientValidator(req.body, locale);
        // validator.validateIngredient();

        const isIngredientExist = await Ingredient.findOne(
            {
                where: {
                    id
                }
            });

        if (!isIngredientExist) {
            throw new GeneralError(locale('INGREDIENT_NOT_FOUND'), 400);
        }

        const updatedIngredient = {
            ingredient_type,
            subtype_id,
            abv,
            ingredient_name: ingredient_name,
            producer: producer,
            description: description
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

module.exports = EditIngredientService;