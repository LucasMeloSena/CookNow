import { NextFunction, Request, Response } from "express";
import { prisma } from "src/infra/database";
import { User, createUserSchema } from "src/interfaces/user.interface";
import { cryptPass } from "src/utils/hash";
import { validarCampoExistenteUserSchema } from "src/utils/validator";
import { z } from "zod";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = createUserSchema.parse(req.body);
    await validarCampoExistenteUserSchema(user);
    user.senha = await cryptPass(user.senha);

    await prisma.user.create({
      data: user,
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      res.status(404).json({ message: err.issues[0].message });
      return;
    }

    res.status(400).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect;
  }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query);
  } catch (err) {
  } finally {
  }
};

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (err) {
  } finally {
  }
};
