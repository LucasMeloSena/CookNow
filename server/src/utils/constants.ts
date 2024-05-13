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
  createUser = "/",
  getUsers = "/",
  getUserById = "/:id",
}

export enum uploadPath {
  uploadUserImage = "/user/image",
}

export enum StatusResponse {
  ok = "success",
  loading = "loading",
  error = "error",
}
