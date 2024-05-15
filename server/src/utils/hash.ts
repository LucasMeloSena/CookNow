import bcryptjs from 'bcryptjs';

export const hashCode = () => {};

export const unHashCode = () => {};

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
    const loginSuccess: boolean = await bcryptjs.compare(pass, dbPass)
    return loginSuccess;
  } catch (err) {
    throw Error("Senha incorreta!")
  }
};
