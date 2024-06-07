import { ContainerButtons, Btn, Icon, MainContainer, PresentationContainer, SubTitle, Title, } from "src/assets/styles/Home/Initial/Initial.style";
import { faCode, faDownload, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function Initial() {
  enum TypeButton {
    download,
    code,
    api
  }

  const url = {
    download: "https://cdnlucasena.netlify.app/app/app-release.apk",
    code: "https://github.com/LucasMeloSena/CookNow?tab=readme-ov-file",
    api: "https://cook-now.vercel.app/api-docs/"
  }

  const handleClickButton = (type: TypeButton) => {
    switch (type) {
      case TypeButton.download: window.open(url["download"]); break;
      case TypeButton.code: window.open(url["code"]); break;
      case TypeButton.api: window.open(url["api"]); break
    }
  }

  return (
    <>
      <MainContainer>
        <PresentationContainer>
          <Title>Mude a sua forma de cozinhar <br/> com o Cook Now!</Title>
          <SubTitle>Conheça o Cook Now! O aplicativo para te auxiliar a fazer a sua receita favorita! Estamos aqui para te fornecer as receitas mundiais mais populares, com todas as informações necessárias! Como ingredientes, modo de preparo e a imagem do resultado da receita! Além disso nosso app possui a funcionalidade de favoritar as suas receitas favoritas para você consultar com mais velocidade. Conte conosco sempre!</SubTitle>
          <ContainerButtons>
            <Btn onClick={() => handleClickButton(TypeButton.download)}>Download Now! <Icon icon={faDownload}/></Btn>
            <Btn onClick={() => handleClickButton(TypeButton.code)}>Source Code <Icon icon={faCode}/></Btn>
            <Btn onClick={() => handleClickButton(TypeButton.api)}>API Documentation <Icon icon={faPaperclip}/></Btn>
          </ContainerButtons>
        </PresentationContainer>
      </MainContainer>
    </>
  )
}