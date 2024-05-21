import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
const dotenv = require("dotenv");
dotenv.config();

export const getExpirationDate = (token: string) => {
  const decoded = jwt.decode(token, { complete: true });
  const payload = decoded!.payload;
  if (typeof payload == "object") {
    const expirationDate: Date = new Date(payload.exp! * 1000);
    return expirationDate;
  }
};

export const generateToken = (user: User) => {
  const key: string = process.env.JWT_KEY ?? "";

  const paylod = {
    id: user!.id,
    email: user!.email,
  };

  const options = {
    expiresIn: "4380h",
  };

  const token: string = jwt.sign(paylod, key, options);
  return token;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  const key: string = process.env.JWT_KEY ?? "";

  if (!token) {
    return res.status(404).json({ message: "Token não fornecido!" });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido!" });
    }
    next();
  });
};
