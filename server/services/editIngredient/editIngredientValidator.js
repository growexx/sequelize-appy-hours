const GeneralError = require('../../util/GeneralError');
const validation = require('../../util/validation');

class EditIngredientValidator extends validation {
    constructor(body, locale) {
        super(locale);
        this.body = body;
    }

    validateIngredient() {
        const { id, ingredient_name, ingredient_type, subtype_id, producer, description, abv, is_file_updated } = this.body;
        super.id(id);
        super.name(ingredient_name);
        super.type(ingredient_type);
        // super.id(subtype_id, 'subtype_id');
        super.field(producer, 'producer');
        super.field(description, 'description');
        super.abv(abv);
        // super.enable(is_file_updated, 'is_file_updated');
    }

    async validateIngredientFile(file) {
        if (!file) {
            throw new GeneralError(this.__('FIELD_REQUIRED', 'image'), 400);
        }
        await super.fileType(file.mimetype);
        await super.fileSize(file.size);
    }
}

module.exports = EditIngredientValidator;
