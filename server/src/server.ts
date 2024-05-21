import express, { Request, Response } from "express";
import { userRoute } from "./routes/user/user.route";
import { uploadRoute } from "./routes/upload/upload.route";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/upload", uploadRoute);

app.use((req: Request, res: Response) => {
  res.status(403).json({
    message: "Rota não encontrada ou Método não permitido!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
