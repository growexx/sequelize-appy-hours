const router = require('express').Router();
const ListIngredientItemController = require('../services/listIngredientItem/listIngredientItemController');
const GetIngredientItemController = require('../services/getIngredientItem/getIngredientItemController');
const AddIngredientItemController = require('../services/addIngredientItem/addIngredientItemController');
const EditIngredientItemController = require('../services/editIngredientItem/editIngredientItemController');
const EnableDisableIngredientItemController = require('../services/enableDisableIngredientItem/enableDisableIngredientItemController');

router.get('/', ListIngredientItemController.getIngredientItems);
router.get('/details', GetIngredientItemController.getIngredientItem);
router.put('/', EditIngredientItemController.editIngredientItem);
router.post('/', AddIngredientItemController.addIngredientItem);
router.patch('/change-status', EnableDisableIngredientItemController.enableDisableIngredientItem);

module.exports = router;
