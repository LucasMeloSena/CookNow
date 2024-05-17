import { Request, Response, NextFunction } from "express";
import { prisma } from "src/infra/database";

export const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receitas = await prisma.receita.findMany({
      include: {
        modo_preparo: {
          select: {
            nome: true
          }
        },
        categoria: {
          select: {
            nome: true
          }
        },
        ingredientes: {
          include: {
            ingrediente: {
              select: {
                nome: true
              }
            }
          },
        }
      }
    })

    const formattedReceitas = receitas?.map(receita => ({
      ...receita,
      categoria: receita.categoria?.nome,
      modo_preparo: receita.modo_preparo.map(m => m.nome),
      ingredientes: receita.ingredientes.map(i => i.ingrediente.nome),
    }));
  
    return res.status(200).json({recipes: formattedReceitas})
  }
  catch (err) {
    res.status(500).json({message: "Ocorreu um erro ao buscar as receitas! Por favor, tente novamente mais tarde!"})
  }
  finally {
    prisma.$disconnect
  }
}

export const getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
  
}