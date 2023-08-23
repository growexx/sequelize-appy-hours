const validation = require('../../util/validation');

class EnableDisableIngredientItemValidator extends validation {
    constructor(body, locale) {
        super(locale);
        this.body = body;
    }

    validateIngredientItem() {
        const { id, is_enabled } = this.body;
        super.id(id);
        super.enable(is_enabled);
    }
}
module.exports = EnableDisableIngredientItemValidator;
