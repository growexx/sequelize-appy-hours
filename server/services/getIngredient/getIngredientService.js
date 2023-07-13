const { Sequelize } = require('../../models');
const db = require('../../models');
const Ingredient = db.ingredient;
const Validator = require('../../util/validation');

class GetIngredientService {

    static async getIngredient(req, locale) {
        const validator = new Validator(locale);
        validator.id(req.query.id);
        const where = { id: req.query.id };
        const options = {
            attributes: ['id', 'ingredient_name', 'ingredient_img',
                'ingredient_type', 'producer', 'description', 'abv', 'is_enabled', 'subtype_id',
                // [Sequelize.col('sub_type.subtype_name'), 'subtype_name']],
            ],
            // include: [{
            //     model: db.subType,
            //     attributes: []
            // }],
            where
        };
        return await Ingredient.findOne(options);
    }
}

module.exports = GetIngredientService;
