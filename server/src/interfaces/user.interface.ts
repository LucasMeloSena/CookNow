import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "O nome não é válido!"),
  email: z.string().email("Email não é válido!"),
  celular: z.string().min(16, "O celular está incorreto!"),
  img_profile: z.string().url("Imagem de perfil não é válida!").startsWith("https://", "Imagem de perfil não é válida!"),
  senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres!"),
  dt_cadastro: z.string().datetime(),
  dt_atualizacao: z.string().datetime(),
});

export type User = z.infer<typeof createUserSchema>;
