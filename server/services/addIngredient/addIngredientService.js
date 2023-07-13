const db = require('../../models');
const GeneralError = require('../../util/GeneralError');
// const UploadService = require('../../util/uploadService');
const Ingredient = db.ingredient;
const AddIngredientValidator = require('./addIngredientValidator');

class AddIngredientService {

    static async addIngredient(req, locale) {
        const { ingredient_name, ingredient_type, subtype_id, producer, description, abv } = req.body;
        const validator = new AddIngredientValidator(req.body, locale);
        validator.validateIngredient();
        // TODO:
        // await validator.validateIngredientFile(req.file);
        const isIngredientExist = await Ingredient.findOne(
            {
                where: {
                    ingredient_name
                }
            });
        if (isIngredientExist) {
            throw new GeneralError(locale('NAME_ALREADY_EXISTS'), 400);
        }
        // const fileName = `ingredient/${ingredient_name.split(' ').join('')}-${Date.now()}.${req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1)}`;
        // await UploadService.uploadFile(req.file, fileName);
        return await Ingredient.create(
            {
                ingredient_type,
                subtype_id,
                abv,
                ingredient_name: ingredient_name.trim(),
                producer: producer.trim(),
                description: description.trim(),
                // ingredient_img: fileName
            }
        );
    }
}

module.exports = AddIngredientService;
