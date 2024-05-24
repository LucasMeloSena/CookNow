import styled from "styled-components";

export const MainContainer = styled.header `
  width: 100vw;
  height: 10vh;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  padding: 20px;
`

export const ImgLogo = styled.img `
  visibility: hidden;
  width: 50px;
  height: 50px;
  border-radius: 10px;
`

export const PagesContainer = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding-right: 10%;
`

export const Pages = styled.h4 `
  color: #FFF;
  font-weight: 300;
`