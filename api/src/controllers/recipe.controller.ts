import { Request, Response, NextFunction } from "express";
import { prisma } from "../infra/database";
import { Category, Id, createCategorySchema, createIdSchema } from "../interfaces/common";
import { ZodError } from "zod";
import { formatRecipeArrayResult, formatRecipeObjectResult, defaultPrismaQuery } from "../utils/constants";
import { createLocationSchema } from "../interfaces/recipe.interface";

export const getRecipesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receitas = await prisma.receita.findMany({
      include: defaultPrismaQuery,
    });

    const formattedReceitas = formatRecipeArrayResult(receitas);

    return res.status(200).json({ recipes: formattedReceitas });
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao buscar as receitas! Por favor, tente novamente mais tarde!" });
  } finally {
    prisma.$disconnect();
  }
};

export const getRecipeByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId: Id = createIdSchema.parse(req.params);

    const recipe = await prisma.receita.findUnique({
      where: {
        id: parseInt(recipeId.id),
      },
      include: defaultPrismaQuery,
    });

    if (recipe == null) {
      return res.status(404).json({ message: "Não existe uma receita com este id!" });
    }

    const formattedReceitas = formatRecipeObjectResult(recipe);

    res.status(200).json({ recipe: formattedReceitas });
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

export const getRecipesByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeCategory: Category = createCategorySchema.parse(req.params);

    const recipes = await prisma.receita.findMany({
      where: {
        categoria: {
          nome: recipeCategory.categoria,
        },
      },
      include: defaultPrismaQuery,
    });

    const formattedReceitas = formatRecipeArrayResult(recipes);

    if (formattedReceitas.length == 0) {
      return res.status(404).json({ message: "Nenhum receita com esta categoria foi encontrada!" });
    }

    res.status(200).json({ recipes: formattedReceitas });
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

export const getRecipesByLocationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const location = createLocationSchema.parse(req.params);
    const recipes = await prisma.receita.findMany({
      where: {
        localizacao: location.location,
      },
      include: defaultPrismaQuery,
    });

    const formattedReceitas = formatRecipeArrayResult(recipes);
    if (formattedReceitas.length == 0) {
      return res.status(404).json({ message: "Não foi encontrada nenhuma receita que tem origem nesta localidade!" });
    }

    return res.status(200).json({ recipes: formattedReceitas });
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
