const router = require('express').Router();
const ListIngredientItemController = require('../services/listIngredientItem/listIngredientItemController');

router.get('/', ListIngredientItemController.getIngredientItems);


module.exports = router;
