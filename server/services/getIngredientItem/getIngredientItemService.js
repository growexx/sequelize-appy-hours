const { Sequelize } = require('../../models');
const db = require('../../models');
const Validator = require('../../util/validation');
const IngredientItem = db.ingredientItem;

class GetIngredientItemService {
    static async getIngredientItem(req, locale) {
        const validator = new Validator(locale);
        validator.id(req.query.id);
        const where = { id: req.query.id };
        const options = {
            attributes: ['id', 'ingredient_price', 'sales_price', 'is_enabled', 'parent_ingredient',
                // 'size_id'
                [Sequelize.col('ingredient.ingredient_name'), 'parent_ingredient_name'],
                // [Sequelize.col('size.size_name'), 'size_name']],
            ],
            include: [
                //     {
                //     model: db.size,
                //     attributes: []
                // },
                {
                    model: db.ingredient,
                    attributes: []
                }],
            where
        };
        return await IngredientItem.findOne(options);
    }
}

module.exports = GetIngredientItemService;
