import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
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
