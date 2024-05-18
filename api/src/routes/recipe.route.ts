import express from "express";
import { createRecipeController, getRecipeByIdController, getRecipesController } from "src/controllers/recipe.controller";
import { recipePath } from "src/utils/constants";

const recipeRoute = express.Router();

recipeRoute.get(recipePath.getAllRecipes, getRecipesController);
recipeRoute.get(recipePath.getRecipeById, getRecipeByIdController);
recipeRoute.post(recipePath.createRecipe, createRecipeController);

export { recipeRoute };
