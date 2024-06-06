import { useEffect, useState } from "react";
import { ContainerRecipes, MainContainer, Title } from "src/assets/styles/Home/Previous/Previous.style";
import { CardRecipe } from "@/CooknowUI"

export default function Previous() {
  type Categoria = {
    nome: string | null;
  };
  
  type ModoPreparo = {
    nome: string;
  };

  type Ingrediente = {
    ingrediente: { nome: string };
    receitaId: number;
    ingredienteId: number;
  };

  type Recipe = {
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

  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleLoadedPage = async () => {
    try {
      const response = await fetch("https://cook-now.vercel.app/v1/recipes/")
      const result = await response.json()
      setRecipes(result.recipes)
    }
    catch (err) {
      console.error("Ocorreu um erro ao buscar as receitas!")
    }
  }

  useEffect(() => {
    handleLoadedPage()
  }, [])

  return (
    <>
      <MainContainer>
        <Title>Uma prévia de nossas receitas:</Title>
        <ContainerRecipes>
          {recipes.map((item, index) => (
            <CardRecipe
              key={index}
              image={item.url_image}
            />
          ))}
        </ContainerRecipes>
      </MainContainer>
    </>
  )
}