import { z } from "zod";
import { Ingrediente } from "./ingredientes.interface";

export type Categoria = {
  nome: string | null;
};

type ModoPreparo = {
  nome: string;
};

export type Recipe = {
  id: number;
  nome: string;
  url_image: string;
  tempo_medio: number;
  custo: number;
  dificuldade: number;
  localizacao: string;
  avaliacao: number;
  dt_cadastro: Date;
  dt_atualizacao: Date;
  categoria: Categoria | null;
  modo_preparo: ModoPreparo[];
  ingredientes: Ingrediente[];
};

export const createLocationSchema = z.object({
  location: z.string().min(3, "Localização inválida!"),
});
export type Location = z.infer<typeof createLocationSchema>;
