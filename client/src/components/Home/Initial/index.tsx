import { BtnDownload, ExampleImage, Icon, MainContainer, PresentationContainer, SubTitle, Title, } from "src/assets/styles/Home/Initial.style";
import App from "src/assets/img/app.png"
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Initial() {
  return (
    <>
      <MainContainer>
        <PresentationContainer>
          <Title>Mude a sua forma de cozinhar <br/> com o Cook Now!</Title>
          <SubTitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</SubTitle>
          <BtnDownload>Download Now! <Icon icon={faDownload}/></BtnDownload>
        </PresentationContainer>
        <ExampleImage src={App}/>
      </MainContainer>
    </>
  )
}