import bcryptjs from "bcryptjs";
import * as crypto from "crypto";
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

export function hashString(id: string): string {
  try {
    const key = process.env.HASH_KEY!;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let crypted = cipher.update(id);
    crypted = Buffer.concat([crypted, cipher.final()]);
    return iv.toString("base64") + ":" + crypted.toString("base64");
  } catch (err) {
    throw Error("Não foi possível encriptar a string");
  }
}

export function unHashString(hashId: string): string {
  try {
    const key = process.env.HASH_KEY!;
    const textParts = hashId.split(":");
    const iv = Buffer.from(textParts.shift()!, "base64");
    const encryptedTextBuffer = Buffer.from(textParts.join(":"), "base64");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    throw Error("Hash inválido!");
  }
}

export function generate4DigitCode(): string {
  const randomNumber = Math.floor(Math.random() * 10000);
  const code = randomNumber.toString().padStart(4, "0");
  return code;
}
