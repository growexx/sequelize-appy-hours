const ListIngredientController = require("../services/listIngredient/listIngredientController")

const router = require("express").Router()

router.get("/", ListIngredientController.getIngredients)

module.exports = router