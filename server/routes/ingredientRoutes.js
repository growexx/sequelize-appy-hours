const AddIngredientController = require("../services/addIngredient/addIngredientController")
const ListIngredientController = require("../services/listIngredient/listIngredientController")

const router = require("express").Router()

router.get("/", ListIngredientController.getIngredients)
router.post("/", AddIngredientController.addIngredient)

module.exports = router