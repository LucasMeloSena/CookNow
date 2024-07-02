import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../infra/database/database";
import {
  User,
  UserRegister,
  UserLogin,
  createUserLoginShema,
  createUserRegisterShema,
  createUserIdSchema,
  UserId,
  createUserRecipeSchema,
  UserRecipe,
  UserUpdate,
  createUserUpdateShema,
  createUserEmailSchema,
  UserEmail,
  createUserPassSchema,
  UserPass,
} from "../interfaces/user.interface";
import { comparePass, cryptPass, generate4DigitCode } from "../utils/hash";
import { generateToken, getExpirationDate } from "../utils/token";
import { validarCampoExistenteUserSchema } from "../utils/validator";
import { z } from "zod";
import { transporter } from "../infra/email";
import { userReturnMessage } from "../utils/constants";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserRegister = createUserRegisterShema.parse(req.body);
    await validarCampoExistenteUserSchema(user);
    user.senha = await cryptPass(user.senha);

    await prisma.user.create({
      data: user,
    });

    res.status(201).json({ message: userReturnMessage.register });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar cadastrar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
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
      res.status(200).json({ message: userReturnMessage.login, user: user, token: token, expiresIn: expirationDate });
    }
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar realizar o login! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const searchUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: UserId = createUserIdSchema.parse(req.query);

    const user: User = await prisma.user.findUnique({
      where: {
        id: userId.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    } else {
      return res.status(200).json({ message: userReturnMessage.searchById, user: user });
    }
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar encontrar o usuário! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const favoriteUserRecipeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecipe: UserRecipe = createUserRecipeSchema.parse(req.body);

    const favoriteRecipes = await prisma.user_recipe.findMany({
      where: {
        userId: userRecipe.userId,
        recipeId: userRecipe.recipeId,
      },
    });
    if (favoriteRecipes.length != 0) {
      return res.status(404).json({ message: "Esta receita já está como favorita no seu usuário!" });
    }

    await prisma.user_recipe.create({
      data: {
        userId: userRecipe.userId,
        recipeId: userRecipe.recipeId,
      },
    });

    return res.status(201).json({ message: userReturnMessage.favoriteRecipe });
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar favoritar esta receita! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const searchFavoriteUserRecipesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: UserId = createUserIdSchema.parse(req.query);

    const userFavoriteUserRecipes = await prisma.user_recipe.findMany({
      where: {
        userId: userId.id,
      },
    });
    if (!userFavoriteUserRecipes) {
      return res.status(404).json({ message: "Receitas não encontradas!" });
    } else {
      const recipesId: number[] = userFavoriteUserRecipes.map((item) => item.recipeId);
      res.status(200).json({ message: userReturnMessage.searchFavoriteRecipes, recipes: recipesId });
    }
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar localizar as receitas! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const deleteFavoriteUserRecipeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecipe: UserRecipe = createUserRecipeSchema.parse(req.body);

    const recipes = await prisma.user_recipe.findMany({
      where: {
        userId: userRecipe.userId,
        recipeId: userRecipe.recipeId,
      },
    });

    if (recipes.length == 0) {
      return res.status(404).json({ message: "Não é possível remover uma receita que não está nos seus favoritos!" });
    }

    await prisma.user_recipe.deleteMany({
      where: {
        userId: userRecipe.userId,
        recipeId: userRecipe.recipeId,
      },
    });

    return res.status(200).json({ message: userReturnMessage.deleteFavoriteRecipe });
  } catch (err) {
    const msg: string = "Ocorreu um erro ao tentar remover as receitas dos favoritos! Por favor, tente novamente mais tarde!";
    const errMessage: string = (err as Error).message ?? msg;

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: msg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserUpdate = createUserUpdateShema.parse(req.body);

    let userInfo = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userInfo) {
      return res.status(404).json({message: "Usuário não encontrado!"})
    }

    if (userInfo?.senha != user.senha) {
      user.senha = await cryptPass(user.senha);
    }

    userInfo = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nome: user.nome,
        celular: user.celular,
        email: user.email,
        senha: user.senha,
        img_profile: user.img_profile,
        dt_atualizacao: user.dt_atualizacao,
      },
    });

    res.status(200).json({ message: userReturnMessage.updateUser, user: userInfo });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar atualizar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const authCodeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserEmail = createUserEmailSchema.parse(req.body);
    const codigo: string = generate4DigitCode();

    const conta: User = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!conta) {
      res.status(404).json({ message: "Nenhuma conta com este email foi encontrada!" });
    } else {
      await transporter.sendMail({
        from: `"Cook Now!" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Recuperação de Senha",
        text: "Recuperar senha usuário",
        html: `Olá ${conta.nome}! <br> Digite este código: ${codigo} <br> Para prosseguir com a recuperação de sua senha. <br> Se você não realizou essa solicitação, por favor desconsidere este email.`,
      });

      res.status(200).json({
        message: userReturnMessage.email,
        code: codigo,
        id: conta.id,
      });
    }
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar gerar o código de autenticação! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};

export const updateUserPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserPass = createUserPassSchema.parse(req.body);
    user.password = await cryptPass(user.password);

    if (user.token != process.env.TOKEN) {
      return res.status(404).json({ message: "Token inválido!" });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        senha: user.password,
        dt_atualizacao: user.dt_atualizacao,
      },
    });

    res.status(200).json({ message: userReturnMessage.updatePass });
  } catch (err) {
    const errMessage: string = (err as Error).message ?? "Ocorreu um erro ao tentar atualizar o usuário! Por favor, tente novamente mais tarde!";

    if (err instanceof z.ZodError) {
      let errMsg: string = err.issues[0].message;
      if (errMsg == "Required") {
        errMsg = "Dados ausentes ou inválidos!";
      }
      return res.status(500).json({ message: errMsg });
    }

    res.status(500).json({
      message: errMessage,
    });
  } finally {
    prisma.$disconnect();
  }
};
