import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export enum userPath {
  createUser = "/register/",
  getUser = "/login/",
  updateUser = "/update/",
  getUserById = "/",
  authCode = "/auth/pass/",
  updatePass = "/update/pass/",
  favoriteRecipeOptions = "/favorite/recipe/",
}

export enum uploadPath {
  userImageControl = "/user/image/",
  updateUserImage = "/update/user/image/",
}

export enum fileTypes {
  jpg = ".jpg",
  jpeg = ".jpeg",
  png = ".png",
}

export enum userReturnMessage {
  register = "Usuário cadastrado com sucesso!",
  login = "Login efetudo com sucesso!",
  searchById = "Usuário encontrado com sucesso!",
  email = "Email enviado com sucesso!",
  updatePass = "Senha do usuário atualizada com sucesso!",
  favoriteRecipe = "Receita favoritada com sucesso!",
  searchFavoriteRecipes = "Receitas encontradas com sucesso!",
  deleteFavoriteRecipe = "Receita removida dos favoritos com sucesso!",
  updateUser = "Usuário atualizado com sucesso!",
}

export enum uploadReturnMessage {
  upload = "Upload de imagem realizado com sucesso!",
  delete = "Imagem excluída com sucesso!",
  update = "Imagem atualizada com sucesso!",
}
