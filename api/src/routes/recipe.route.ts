import express from "express";
import { getFeaturedRecipesController, getRecipeByIdController, getRecipesByCategoryController, getRecipesByLocationController, getRecipesController } from "../controllers/recipe.controller";
import { recipePath } from "../utils/constants";

const recipeRoute = express.Router();

recipeRoute.get(recipePath.getAllRecipes, getRecipesController);
recipeRoute.get(recipePath.getRecipeById, getRecipeByIdController);
recipeRoute.get(recipePath.getRecipesByCategory, getRecipesByCategoryController);
recipeRoute.get(recipePath.getRecipesByLocation, getRecipesByLocationController);
recipeRoute.get(recipePath.getFeaturedRecipes, getFeaturedRecipesController);

export { recipeRoute };
