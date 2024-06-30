import express, { Request, Response } from "express";
import { userRoute } from "./routes/user/user.route";
import { uploadRoute } from "./routes/upload/upload.route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/upload", uploadRoute);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Bem Vindo ao CookNow server!",
  });
});

app.use((req: Request, res: Response) => {
  return res.status(403).json({
    message: "Rota não encontrada ou Método não permitido!",
  });
});

export { app };
