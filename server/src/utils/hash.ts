const bcryptjs = require("bcryptjs");

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

export const comparePass = (pass: string) => {};
