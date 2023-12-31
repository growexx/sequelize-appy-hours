const AddIngredientController = require("../services/addIngredient/addIngredientController");
const EditIngredientController = require("../services/editIngredient/editIngredientController");
const EnableDisableIngredientController = require("../services/enableDisableIngredient/enableDisableIngredientController");
const GetIngredientController = require("../services/getIngredient/getIngredientController");
const ListIngredientController = require("../services/listIngredient/listIngredientController")

const router = require("express").Router()

router.get("/", ListIngredientController.getIngredients)
router.get('/details', GetIngredientController.getIngredient);
router.post("/", AddIngredientController.addIngredient)
router.patch('/change-status', EnableDisableIngredientController.enableDisableIngredient);
router.post('/update', EditIngredientController.editIngredient);
module.exports = router