import express from "express";
import { createRecipeController, getRecipeByIdController, getRecipesController } from "../controllers/recipe.controller";
import { recipePath } from "../utils/constants";

const recipeRoute = express.Router();

recipeRoute.get(recipePath.getAllRecipes, getRecipesController);
recipeRoute.get(recipePath.getRecipeById, getRecipeByIdController);
recipeRoute.post(recipePath.createRecipe, createRecipeController);

export { recipeRoute };
