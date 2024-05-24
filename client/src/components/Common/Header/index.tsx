import {
  MainContainer,
  ImgLogo,
  PagesContainer,
  Pages
} from "src/assets/styles/Common/Header.style"

export default function Header() {
  return (
    <>
      <MainContainer>
        <ImgLogo />
        <PagesContainer>
          <Pages>Home</Pages>
          <Pages>About</Pages>
          <Pages>Example</Pages>
          <Pages>Contact</Pages>
        </PagesContainer>
      </MainContainer>
    </>
  );
}
