import express from "express";
import { ingredientesPath, recipePath } from "../utils/constants";
import { getIngredienteByIdController, getIngredientesController } from "../controllers/ingredientes.controller";

const ingredientesRoute = express.Router();

ingredientesRoute.get(ingredientesPath.getIngredientes, getIngredientesController);
ingredientesRoute.get(ingredientesPath.getIngredienteById, getIngredienteByIdController);

export { ingredientesRoute };
