import express from "express";
import {
  authCodeController,
  createUserController,
  deleteFavoriteUserRecipeController,
  favoriteUserRecipeController,
  loginUserController,
  searchFavoriteUserRecipesController,
  searchUserByIdController,
  updateUserController,
  updateUserPasswordController,
} from "../..//controllers/user.controller";
import { userPath } from "../..//utils/constants";
import { verifyToken } from "../../utils/token";

const userRoute = express.Router();

userRoute.post(userPath.getUser, loginUserController);
userRoute.post(userPath.createUser, createUserController);
userRoute.post(userPath.authCode, authCodeController);
userRoute.post(userPath.updatePass, updateUserPasswordController);
userRoute.get(userPath.getUserById, verifyToken, searchUserByIdController);
userRoute.post(userPath.crateFavoriteRecipe, verifyToken, favoriteUserRecipeController);
userRoute.get(userPath.searchFavoriteRecipe, verifyToken, searchFavoriteUserRecipesController);
userRoute.delete(userPath.deleteFavoriteRecipe, verifyToken, deleteFavoriteUserRecipeController);
userRoute.put(userPath.updateUser, verifyToken, updateUserController);

export { userRoute };
