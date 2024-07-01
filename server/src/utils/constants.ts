import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const dotenv = require("dotenv");
dotenv.config();

let firebaseConfig = {
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
  crateFavoriteRecipe = "/favorite/recipe/",
  searchFavoriteRecipe = "/favorite/recipe/",
  deleteFavoriteRecipe = "/favorite/recipe/",
}

export enum uploadPath {
  uploadUserImage = "/user/image/",
  removeUserImage = "/user/image/",
  updateUserImage = "/update/user/image/",
}

export enum fileTypes {
  jpg = ".jpg",
  jpeg = ".jpeg",
  png = ".png",
}

export enum returnMessage {
  register = "Usuário cadastrado com sucesso!",
  login = "Login efetudo com sucesso!",
  searchById = "Usuário encontrado com sucesso!",
  email = "Email enviado com sucesso!",
}
