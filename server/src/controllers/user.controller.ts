import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../infra/database";
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
import { comparePass, cryptPass, generate4DigitCode, hashString, unHashString } from "../utils/hash";
import { generateToken, getExpirationDate } from "../utils/token";
import { validarCampoExistenteUserSchema } from "../utils/validator";
import { z } from "zod";
import { transporter } from "../infra/email";

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
      user.id = hashString(user.id);
      res.status(200).json({ message: "Login efetudo com sucesso!", user: user, token: token, expiresIn: expirationDate });
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
    const userId: string = unHashString(userRecipe.userId);

    const favoriteRecipes = await prisma.user_recipe.findMany({
      where: {
        userId: userId,
        recipeId: userRecipe.recipeId,
      },
    });
    if (favoriteRecipes.length != 0) {
      return res.status(404).json({ message: "Esta receita já está como favorita no seu usuário!" });
    }

    await prisma.user_recipe.create({
      data: {
        userId: userId,
        recipeId: userRecipe.recipeId,
      },
    });

    return res.status(201).json({ message: "Receita favoritada com sucesso!" });
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
    const id: string = unHashString(userId.id);

    const userFavoriteUserRecipes = await prisma.user_recipe.findMany({
      where: {
        userId: id,
      },
    });
    if (!userFavoriteUserRecipes) {
      return res.status(404).json({ message: "Receitas não encontradas!" });
    } else {
      const recipesId: number[] = userFavoriteUserRecipes.map((item) => item.recipeId);
      res.status(200).json({ message: "Dados encontrados com sucesso!", recipes: recipesId });
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
    const userId: string = unHashString(userRecipe.userId);

    await prisma.user_recipe.deleteMany({
      where: {
        userId: userId,
        recipeId: userRecipe.recipeId,
      },
    });

    return res.status(201).json({ message: "Receita removida dos favoritos com sucesso!" });
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
    user.id = unHashString(user.id);

    let userInfo = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

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

    res.status(201).json({ message: "Usuário atualizado com sucesso!", user: userInfo });
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
    const codigo: string = generate4DigitCode()

    const conta: User = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!conta) {
      res.status(404).json({ message: "Nenhuma conta com este email foi encontrada" });
    } else {
      await transporter.sendMail({
        from: `"Cook Now!" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Recuperação de Senha",
        text: "Recuperar senha usuário",
        html: `Olá ${conta.nome}! <br> Digite este código: ${codigo} <br> Para prosseguir com a recuperação de sua senha. <br> Se você não realizou essa solicitação, por favor desconsidere este email.`,
      });

      res.status(200).json({
        message: "Email enviado com sucesso!",
        code: codigo,
        id: conta.id
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
    const user: UserPass = createUserPassSchema.parse(req.body)
    user.password = await cryptPass(user.password)

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        senha: user.password,
        dt_atualizacao: user.dt_atualizacao
      }
    })

    res.status(200).json({message: "Senha do usuário atualizada com sucesso!"})
  }
  catch (err) {
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
  }
  finally {
    prisma.$disconnect()
  }
}