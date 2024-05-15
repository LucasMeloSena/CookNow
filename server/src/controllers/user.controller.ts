import { NextFunction, Request, Response } from "express";
import { prisma } from "src/infra/database";
import { User, UserLogin, createUserLoginShema, createUserRegisterShema } from "src/interfaces/user.interface";
import { comparePass, cryptPass } from "src/utils/hash";
import { validarCampoExistenteUserSchema } from "src/utils/validator";
import { boolean, z } from "zod";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = createUserRegisterShema.parse(req.body);
    await validarCampoExistenteUserSchema(user);
    user.senha = await cryptPass(user.senha);

    await prisma.user.create({
      data: user,
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      res.status(500).json({ message: err.issues[0].message });
      return;
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect;
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userLogin : UserLogin = createUserLoginShema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: userLogin.email,
      }
    })

    if (!user) {
      res.status(404).json({message: "Email incorreto!"})
      return
    }

    const correctPass: boolean = await comparePass(user.senha, userLogin.senha)

    if (!correctPass) {
      res.status(404).json({message: "Senha incorreta!"});
      return
    }

    if (user && correctPass) {
      res.status(200).json({message: "Login efetudo com sucesso!", user: user})
    }
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      res.status(500).json({ message: err.issues[0].message });
      return;
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect;
  }
};