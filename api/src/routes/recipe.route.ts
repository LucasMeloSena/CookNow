import express from "express";
import { createRecipeController, getRecipeByIdController, getRecipesByCategoryController, getRecipesByLocationController, getRecipesController } from "../controllers/recipe.controller";
import { recipePath } from "../utils/constants";

const recipeRoute = express.Router();

recipeRoute.get(recipePath.getAllRecipes, getRecipesController);
recipeRoute.get(recipePath.getRecipeById, getRecipeByIdController);
recipeRoute.get(recipePath.getRecipesByCategory, getRecipesByCategoryController);
recipeRoute.get(recipePath.getRecipesByLocation, getRecipesByLocationController)

recipeRoute.post(recipePath.createRecipe, createRecipeController);

export { recipeRoute };
