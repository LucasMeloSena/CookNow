import { z } from "zod";

export const createIdSchema = z.object({
  id: z.string().min(1, "Id inválido!"),
});
export type Id = z.infer<typeof createIdSchema>;

export const createCategorySchema = z.object({
  categoria: z.string().min(4, "Categoria inválida!"),
});
export type Category = z.infer<typeof createCategorySchema>;
