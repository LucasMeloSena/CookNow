import { Request, Response } from "express";
import { prisma } from "src/infra/database";
import { User, createUserSchema } from "src/interfaces/user.interface";
import { z } from "zod";

export const createUserController = async (req: Request, res: Response) => {
  try {
    //validar se dados já existem

    const user: User = createUserSchema.parse(req.body);

    await prisma.user.create({
      data: user,
    });

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(404).json({ message: err.issues[0].message });
      return;
    }
    res.status(400).json({
      message:
        "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!",
    });
  } finally {
    prisma.$disconnect;
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
  } catch (err) {
  } finally {
  }
};
