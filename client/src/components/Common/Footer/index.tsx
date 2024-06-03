import { MainContainer, Copywrite, Text } from "src/assets/styles/Common/Footer.style";

export default function Footer() {
  const date = new Date().getFullYear()

  return (
    <>
      <MainContainer>
        <Copywrite>Copywrite {date} - Todos os direitos reservados!</Copywrite>
        <Text>Uma aplicação do ecossistema Flutter.</Text>
      </MainContainer>
    </>
  )
}