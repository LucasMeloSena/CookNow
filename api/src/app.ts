import express, { Request, Response } from "express";
import { recipeRoute } from "./routes/recipe.route";
import { ingredientesRoute } from "./routes/ingredientes.route";
import { migrationsRoute } from "./routes/migrations.route";
import cors from "cors";
import swaggerDocs from "../swagger.json";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1", recipeRoute);
app.use("/v1", ingredientesRoute);
app.use("/migrations", migrationsRoute);

const swaggerCss = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, {
    customCss: ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: swaggerCss,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Seja bem-vindo à API Pública do CookNow!" });
});

app.use((req: Request, res: Response) => {
  res.status(403).json({
    message: "Rota não encontrada ou Método não permitido!",
  });
});

export { app };
