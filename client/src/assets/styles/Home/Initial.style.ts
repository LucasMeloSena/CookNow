import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const MainContainer = styled.div `
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10%;
  padding: 40px 40px;
`

export const PresentationContainer = styled.div `
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const Title = styled.h1 `
  font-family: "Bebas Neue", sans-serif;
  color: #FFF;
  font-size: 52px;
  line-height: 1;
`

export const SubTitle = styled.h5 `
  border-radius: 10px;
  font-family: Poppins;
  color: #D3D3D3;
  font-weight: 400;
`

export const BtnDownload = styled.button `
  margin-top: 20px;
  border-radius: 10px;
  font-family: Poppins;
  background-color: #FFF;
  color: #1b2029;
  border: none;
  padding: 10px 40px;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transition: all 0.5s;
    background-color: #1b20297e;
    color: #FFF;
  }
`

export const ExampleImage = styled.img `
width: 400px;
`

export const Icon = styled(FontAwesomeIcon) `

`