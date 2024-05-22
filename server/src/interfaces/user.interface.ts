import { z } from "zod";

export type User = {
  id: string;
  nome: string;
  email: string;
  celular: string;
  img_profile: string;
  senha: string;
  dt_cadastro: Date;
  dt_atualizacao: Date;
} | null;

export const createUserRegisterShema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "O nome não é válido!"),
  email: z.string().email("Email não é válido!"),
  celular: z.string().min(16, "O celular está incorreto!"),
  img_profile: z.string().url("Imagem de perfil não é válida!").startsWith("https://", "Imagem de perfil não é válida!"),
  senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres!"),
  dt_cadastro: z.string().datetime({ offset: true }),
  dt_atualizacao: z.string().datetime({ offset: true }),
});
export type UserRegister = z.infer<typeof createUserRegisterShema>;

export const createUserLoginShema = z.object({
  email: z.string().email("Email inválido!"),
  senha: z.string().min(6, "A senha possui no mínimo 6 caracteres!"),
});
export type UserLogin = z.infer<typeof createUserLoginShema>;

export const createUserIdSchema = z.object({
  id: z.string().min(24, "Id inválido!"),
});
export type UserId = z.infer<typeof createUserIdSchema>;

export const createUserRecipeSchema = z.object({
  userId: z.string().min(24, "Id do usuário inválido!"),
  recipeId: z.number().min(1, "Id da receita inválido!"),
});
export type UserRecipe = z.infer<typeof createUserRecipeSchema>;

export const createUserUpdateShema = z.object({
  id: z.string(),
  nome: z.string().min(1, "O nome não é válido!"),
  email: z.string().email("Email não é válido!"),
  celular: z.string().min(16, "O celular está incorreto!"),
  img_profile: z.string().url("Imagem de perfil não é válida!").startsWith("https://", "Imagem de perfil não é válida!"),
  senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres!"),
  dt_atualizacao: z.string().datetime({ offset: true }),
});
export type UserUpdate = z.infer<typeof createUserUpdateShema>;
