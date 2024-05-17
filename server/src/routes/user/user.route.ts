import express from "express";
import { createUserController, loginUserController, searchUserByIdController } from "src/controllers/user.controller";
import { userPath } from "src/utils/constants";

const userRoute = express.Router();

// limite de tentativas de login

userRoute.get(userPath.getUserById, searchUserByIdController);
userRoute.post(userPath.getUser, loginUserController);
userRoute.post(userPath.createUser, createUserController);

export { userRoute };
