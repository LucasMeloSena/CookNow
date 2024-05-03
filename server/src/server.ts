import express, { Request, Response } from "express";
import { prisma } from "./infra/database";

const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
