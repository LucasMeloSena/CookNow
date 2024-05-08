import express from "express";
import {
  createUserController,
  getUserByIdController,
} from "src/controllers/user.controller";
import { userPath } from "src/utils/constants";

const userRoute = express.Router();

// verificação de segurança com jwt
// hash para requisições get
// limite de tentativas de login

userRoute.get(userPath.getUsers);
userRoute.get(userPath.getUserById, getUserByIdController);
userRoute.post(userPath.createUser, createUserController);

export { userRoute };
