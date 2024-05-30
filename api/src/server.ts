import express, { Request, Response } from "express";
import cors from "cors";
import { recipeRoute } from "./routes/recipe.route";
import { ingredientesRoute } from "./routes/ingredientes.route";
import swaggerDocs from "../swagger.json";
const swaggerUI = require('swagger-ui-express');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

app.use("/v1", recipeRoute);
app.use("/v1", ingredientesRoute);
const swaggerCss = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { customCssUrl: swaggerCss }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Seja bem-vindo à API Pública do CookNow!" });
});

app.use((req: Request, res: Response) => {
  res.status(403).json({
    message: "Rota não encontrada ou Método não permitido!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
