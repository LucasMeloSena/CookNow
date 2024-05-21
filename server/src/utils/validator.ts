import { prisma } from "src/infra/database";
import { Upload } from "src/interfaces/upload.interface";
import { UserRegister } from "src/interfaces/user.interface";

export const validarCampoExistenteUserSchema = async (user: UserRegister) => {
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

export const validarUploadArquivo = (upload: Upload) => {
  if (upload.file == null) {
    throw Error("Nenhum arquivo enviado!");
  }
  if (!upload.fileName || upload.fileName.toString().trim() == "") {
    throw Error("O nome do arquivo é obrigatório!");
  }

  const allowedFilesTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedFilesTypes.includes(upload.file.mimetype)) {
    throw Error("Tipo de arquivo não permitido!");
  }
};
