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
import { verifyToken } from "../../utils/token";

const userRoute = express.Router();

// limite de tentativas de login

userRoute.post(userPath.getUser, loginUserController);
userRoute.post(userPath.createUser, createUserController);
userRoute.get(userPath.getUserById, verifyToken, searchUserByIdController);
userRoute.post(userPath.crateFavoriteRecipe, verifyToken, favoriteUserRecipeController);
userRoute.get(userPath.searchFavoriteRecipe, verifyToken, searchFavoriteUserRecipesController);
userRoute.delete(userPath.deleteFavoriteRecipe, verifyToken, deleteFavoriteUserRecipeController);

export { userRoute };
