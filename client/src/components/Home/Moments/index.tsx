import { MainContainer, ExampleImage, TextContainer, Title, SubTitle } from "src/assets/styles/Home/Moments/Moments.style";
import MomentsImage from "src/assets/img/moments.png"

export default function Moments() {
  return (
    <>
      <MainContainer>
        <ExampleImage src={MomentsImage}/>
        <TextContainer>
          <Title>Mais que apenas um app!</Title>
          <SubTitle>Construindo momentos com aqueles que você ama!</SubTitle>
          <SubTitle>Instale agora e comece a usar!</SubTitle>
        </TextContainer>
      </MainContainer>
    </>
  )
}