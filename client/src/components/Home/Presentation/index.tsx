import { MainContainer, ExampleImage, Title, SubTitle, TextContainer, PassosImage } from "src/assets/styles/Home/Presentation/Presentation.style";
import App from "src/assets/img/app_view.png"
import Passos from "src/assets/img/passos.png"

export default function Presentation() {
  return (
    <>
      <MainContainer>
        <PassosImage src={Passos}/>
        <TextContainer>
          <Title>Com você do início ao fim! </Title>
          <SubTitle>Te ajudando em cada passo para chegada de sua receita de sucesso! <br/> Sinta-se como se estivessémos ao seu lado!</SubTitle>
        </TextContainer>
        <ExampleImage src={App}/>
      </MainContainer>
    </>
  )
}