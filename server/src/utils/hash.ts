import bcryptjs from "bcryptjs";
import CryptoJS from "crypto-js";
import { randomBytes } from "crypto";
const dotenv = require("dotenv");
dotenv.config();

export const cryptPass = async (pass: string): Promise<string> => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(pass, salt);
    return hashedPassword;
  } catch (err) {
    throw Error("Erro ao encriptar a senha!");
  }
};

export const comparePass = async (dbPass: string, pass: string) => {
  try {
    const loginSuccess: boolean = await bcryptjs.compare(pass, dbPass);
    return loginSuccess;
  } catch (err) {
    throw Error("Senha incorreta!");
  }
};

export function generate4DigitCode(): string {
  const randomNumber = Math.floor(Math.random() * 10000);
  const code = randomNumber.toString().padStart(4, "0");
  return code;
}

export function hashString(message: string): string {
  const secretKey = process.env.HASH_KEY!
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
  return encryptedMessage;
}

export function unHashString(encryptedMessage: string): string {
  const secretKey = process.env.HASH_KEY!
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}
