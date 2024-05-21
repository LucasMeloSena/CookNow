import express, { Request, Response } from "express";
import cors from "cors";
import { recipeRoute } from "./routes/recipe.route";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());
app.use(recipeRoute);

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
