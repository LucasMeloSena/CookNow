import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { prisma } from "src/infra/database";
import { User, UserRegister, UserLogin, createUserLoginShema, createUserRegisterShema, createUserIdSchema, UserId, createUserRecipeSchema, UserRecipe } from "src/interfaces/user.interface";
import { comparePass, cryptPass, hashString, unHashString } from "src/utils/hash";
import { generateToken, getExpirationDate } from "src/utils/token";
import { validarCampoExistenteUserSchema } from "src/utils/validator";
import { z } from "zod";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserRegister = createUserRegisterShema.parse(req.body);
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
    const userLogin: UserLogin = createUserLoginShema.parse(req.body);

    const user: User = await prisma.user.findUnique({
      where: {
        email: userLogin.email,
      },
    });

    if (!user) {
      res.status(404).json({ message: "Email incorreto!" });
      return;
    }

    const correctPass: boolean = await comparePass(user.senha, userLogin.senha);

    if (!correctPass) {
      res.status(404).json({ message: "Senha incorreta!" });
      return;
    }

    if (user && correctPass) {
      const token: string = generateToken(user);
      const expirationDate = getExpirationDate(token);
      user.id = hashString(user.id);
      res.status(200).json({ message: "Login efetudo com sucesso!", user: user, token: token, expiresIn: expirationDate });
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

export const searchUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: UserId = createUserIdSchema.parse(req.query);
    const id: string = unHashString(userId.id);

    const user: User = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    } else {
      user.id = hashString(user.id);
      return res.status(200).json({ message: "Usuário encontrado com sucesso!", user: user });
    }
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar encontrar o usuário! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      return res.status(500).json({ message: err.issues[0].message });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect;
  }
};

export const favoriteRecipeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecipe: UserRecipe = createUserRecipeSchema.parse(req.body);

    await prisma.user_recipe.create({
      data: {
        userId: userRecipe.userid,
        recipeId: userRecipe.recipeId,
      },
    });

    return res.status(201).json({ message: "Receita favoritada com sucesso!" });
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar encontrar o usuário! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      return res.status(500).json({ message: err.issues[0].message });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect;
  }
};
