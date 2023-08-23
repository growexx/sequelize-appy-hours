const validation = require('../../util/validation');

class EditIngredientItemValidator extends validation {
    constructor(body, locale) {
        super(locale);
        this.body = body;
    }

    validateIngredientItem() {
        const { id, parent_ingredient, size_id, ingredient_price, sales_price } = this.body;
        super.id(id);
        super.id(parent_ingredient, 'parent_ingredient');
        // super.id(size_id, 'size_id');
        super.price(ingredient_price, 'ingredient_price');
        super.price(sales_price, 'sales_price');
    }
}

module.exports = EditIngredientItemValidator;
