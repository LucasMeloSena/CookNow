import { Recipe } from "../interfaces/recipe.interface";

export enum recipePath {
  getAllRecipes = "/recipes/",
  getRecipeById = "/recipe/:id",
  getRecipesByCategory = "/recipes/categoria/:categoria",
  getRecipesByLocation = "/recipes/location/:location",
  getFeaturedRecipes = "/recipes/destaques/",
}

export enum ingredientesPath {
  getIngredientes = "/ingredientes/",
  getIngredienteById = "/ingrediente/:id",
}

export const defaultPrismaQuery = {
  modo_preparo: {
    select: {
      nome: true,
    },
  },
  categoria: {
    select: {
      nome: true,
    },
  },
  ingredientes: {
    include: {
      ingrediente: {
        select: {
          nome: true,
        },
      },
    },
  },
};

export const formatRecipeObjectResult = (recipe: Recipe) => {
  return {
    ...recipe,
    categoria: recipe.categoria?.nome,
    modo_preparo: recipe?.modo_preparo.map((m) => m.nome),
    ingredientes: recipe?.ingredientes.map((i) => i.ingrediente.nome),
  };
};

export const formatRecipeArrayResult = (recipe: Recipe[]) => {
  return recipe.map((receita: Recipe) => ({
    ...receita,
    categoria: receita.categoria?.nome,
    modo_preparo: receita.modo_preparo.map((m) => m.nome),
    ingredientes: receita.ingredientes.map((i) => i.ingrediente.nome),
  }));
};
