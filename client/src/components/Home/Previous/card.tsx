import { MainContainer } from "src/assets/styles/Home/Previous/CardRecipe.style";

interface Recipe {
  image: String,
}

export default function CardRecipe({image}: Recipe) {
  return (
    <>
      <MainContainer
        imageUrl={`${image}`}
      />
    </>
  )
}