import express, { Request, Response } from "express";
import { userRoute } from "./routes/user/user.route";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/user", userRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Rota não encontrada!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
