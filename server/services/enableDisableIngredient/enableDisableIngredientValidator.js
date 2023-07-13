const validation = require('../../util/validation');

class EnableDisableIngredientValidator extends validation {
    constructor(body, locale) {
        super(locale);
        this.body = body;
    }
    validateIngredient() {
        const { id, is_enabled } = this.body;
        super.id(id);
        super.enable(is_enabled);
    }
}
module.exports = EnableDisableIngredientValidator;
