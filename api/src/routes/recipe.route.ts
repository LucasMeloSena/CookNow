import express from 'express'
import { getRecipeById, getRecipes } from 'src/controllers/recipe.controller'
import { recipePath } from 'src/utils/constants'

const recipeRoute = express.Router()

recipeRoute.get(recipePath.getAllRecipes, getRecipes)
recipeRoute.get(recipePath.getRecipeById, getRecipeById)

export {recipeRoute}