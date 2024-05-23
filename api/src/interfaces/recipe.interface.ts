import z from "zod";

export type Recipe = {
  id: number,
  nome: string,
  url_image: string,
  tempo_medio: number,
  custo: number,
  dificuldade: number,
  localizacao: string,
  avaliacao: number,
  dt_cadastro: Date,
  dt_atualizacao: Date,
  modo_preparo: string[],
  categoria: string | undefined,
  ingredientes: string[]
} | null

export const createRecipeSchema = z.object({
  id: z.string().min(1, "Id inválido!"),
});
export type RecipeId = z.infer<typeof createRecipeSchema>;
