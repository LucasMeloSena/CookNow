import express from "express";
import { migrationsPath } from "../utils/constants";
import { playMigrationsController, watchMigrationsStatusController } from "../controllers/migrations.controller";

const migrationsRoute = express.Router();

migrationsRoute.get(migrationsPath.action, watchMigrationsStatusController);
migrationsRoute.post(migrationsPath.action, playMigrationsController);

export { migrationsRoute };
