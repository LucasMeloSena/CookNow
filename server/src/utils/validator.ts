import { prisma } from "src/infra/database";
import { User } from "src/interfaces/user.interface";

export const validarCampoExistenteUserSchema = async (user: User) => {
  const hasCelularCadastrado = await prisma.user.findUnique({
    where: {
      celular: user.celular,
    },
  });

  const hasEmailCadastrado = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (hasCelularCadastrado != null) {
    throw Error("O celular fornecido já está cadastrado! Por favor, tente novamente com outro número!");
  }

  if (hasEmailCadastrado != null) {
    throw Error("O email fornecido já está cadastrado! Por favor, tente novamente com outro email!");
  }
};
