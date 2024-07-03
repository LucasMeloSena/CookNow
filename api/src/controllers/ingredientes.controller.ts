import { Request, Response, NextFunction } from "express";
import { prisma } from "../infra/database/database";
import { Id, createIdSchema } from "../interfaces/common";
import { ZodError } from "zod";

export const getIngredientesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientes = await prisma.ingrediente.findMany();
    res.status(200).json({ ingredientes: ingredientes });
  } catch (err) {
    const errorMessage: string = "Ocorreu um erro ao buscar a receita! Por favor, tente novamente mais tarde!";
    return res.status(500).json({ message: errorMessage });
  } finally {
    prisma.$disconnect();
  }
};

export const getIngredienteByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const infoIngrediente: Id = createIdSchema.parse(req.params);
    const ingrediente = await prisma.ingrediente.findUnique({
      where: {
        id: parseInt(infoIngrediente.id),
      },
    });

    if (!ingrediente) {
      return res.status(404).json({ message: "Nenhum ingrediente com este id foi encontrado!" });
    }

    res.status(200).json({ ingrediente: ingrediente });
  } catch (err) {
    const errorMessage: string = "Ocorreu um erro ao buscar a receita! Por favor, tente novamente mais tarde!";

    if (err instanceof ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    } else {
      return res.status(500).json({ message: errorMessage });
    }
  } finally {
    prisma.$disconnect();
  }
};
