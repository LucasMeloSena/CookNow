import express from "express";
import { createUserController, loginUserController } from "src/controllers/user.controller";
import { userPath } from "src/utils/constants";

const userRoute = express.Router();

// limite de tentativas de login
// timeout
// token com jwt
// hash em req get

userRoute.post(userPath.getUser, loginUserController);
userRoute.post(userPath.createUser, createUserController);

export { userRoute };
