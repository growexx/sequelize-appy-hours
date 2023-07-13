const GeneralError = require('../../util/GeneralError');
const validation = require('../../util/validation');

class AddIngredientValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    validateIngredient () {
        const { ingredient_name, ingredient_type, subtype_id, producer, description } = this.body;
        super.name(ingredient_name);
        super.type(ingredient_type);
        // TODO:
        // super.id(subtype_id, 'subtype_id');
        super.field(producer, 'producer');
        super.field(description, 'description');
    }

    async validateIngredientFile (file) {
        if (!file) {
            throw new GeneralError(this.__('FIELD_REQUIRED', 'image'), 400);
        }
        await super.fileType(file.mimetype);
        await super.fileSize(file.size);
    }
}

module.exports = AddIngredientValidator;
