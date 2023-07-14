const { Sequelize } = require('../../models');
const db = require('../../models');
const IngredientItem = db.ingredientItem;
const Utils = require('../../util/utilFunctions');

class ListIngredientItemService {
    static async getIngredientItems(req) {
        const { sort, sortBy, is_enabled, parent_ingredient, size_id } = req.query;
        const limit = req.query.limit ? _.toInteger(req.query.limit) : 10;
        const page = req.query.page ? _.toInteger(req.query.page) : 1;
        let sortingParams = [[{ model: db.ingredient }, 'ingredient_name', 'asc']];
        if (sort && sortBy) {
            if (sortBy === 'parent_ingredient') {
                sortingParams = [[{ model: db.ingredient }, 'ingredient_name', sort]];
            }
            // if (sortBy === 'size') {
            //     sortingParams = [[{ model: db.size }, 'size_name', sort]];
            // }
        }
        // const sizeInclude = {
        //     model: db.size,
        //     attributes: []
        // };
        const ingredientInclude = {
            model: db.ingredient,
            attributes: []
        };
        const where = {};
        if (is_enabled) {
            where.is_enabled = is_enabled;
        }
        if (size_id) {
            where.size_id = size_id;
        }
        if (parent_ingredient) {
            where.parent_ingredient = parent_ingredient;
        }
        const include = [
            ingredientInclude
        ];
        const options = {
            attributes: ['id', 'ingredient_price', 'sales_price', 'is_enabled',
                [Sequelize.col('ingredient.ingredient_name'), 'parent_ingredient'],
                // [Sequelize.col('size.size_name'), 'size_name']],
            ],
            paginate: limit,
            order: sortingParams,
            where,
            include,
            page
        };
        return await Utils.paginator(IngredientItem, options, page, limit);
    }
}

module.exports = ListIngredientItemService;
