const validation = require('../../util/validation');

class AddIngredientItemValidator extends validation {
    constructor(body, locale) {
        super(locale);
        this.body = body;
    }

    async validateIngredientItem() {
        const { parent_ingredient, size_id, ingredient_price, sales_price } = this.body;
        super.id(parent_ingredient, 'parent_ingredient');
        // super.id(size_id, 'size_id');
        super.price(ingredient_price, 'ingredient_price');
        super.price(sales_price, 'sales_price');
    }
}

module.exports = AddIngredientItemValidator;
