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
userRoute.post(userPath.favoriteRecipeOptions, verifyToken, favoriteUserRecipeController);
userRoute.get(userPath.favoriteRecipeOptions, verifyToken, searchFavoriteUserRecipesController);
userRoute.delete(userPath.favoriteRecipeOptions, verifyToken, deleteFavoriteUserRecipeController);
userRoute.put(userPath.updateUser, verifyToken, updateUserController);

export { userRoute };
