import express from "express";
import { createUserController, getUserByIdController, getUsersController } from "src/controllers/user.controller";
import { userPath } from "src/utils/constants";

const userRoute = express.Router();

// limite de tentativas de login
// timeout
// token com jwt
// hash em req get

userRoute.get(userPath.getUsers, getUsersController);
userRoute.get(userPath.getUserById, getUserByIdController);
userRoute.post(userPath.createUser, createUserController);

export { userRoute };
