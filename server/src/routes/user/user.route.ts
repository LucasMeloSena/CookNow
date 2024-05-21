import express from "express";
import {
  createUserController,
  deleteFavoriteUserRecipeController,
  favoriteUserRecipeController,
  loginUserController,
  searchFavoriteUserRecipesController,
  searchUserByIdController,
} from "../..//controllers/user.controller";
import { userPath } from "../..//utils/constants";

const userRoute = express.Router();

// limite de tentativas de login

userRoute.get(userPath.getUserById, searchUserByIdController);
userRoute.post(userPath.getUser, loginUserController);
userRoute.post(userPath.createUser, createUserController);
userRoute.post(userPath.crateFavoriteRecipe, favoriteUserRecipeController);
userRoute.get(userPath.searchFavoriteRecipe, searchFavoriteUserRecipesController);
userRoute.delete(userPath.deleteFavoriteRecipe, deleteFavoriteUserRecipeController);

export { userRoute };
