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
  gap: 15px;
`

export const Title = styled.h1 `
  font-family: "Bebas Neue", sans-serif;
  color: #1b2029;
  font-size: 52px;
  line-height: 0.8;
`

export const SubTitle = styled.h5 `
  border-radius: 10px;
  font-family: Poppins;
  color: #1b2029;
  font-weight: 300;
`

export const BtnDownload = styled.button `
  border-radius: 10px;
  font-family: Poppins;
  background-color: #1b2029;
  color: #fff;
  border: none;
  padding: 10px 40px;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transition: all 0.5s;
    background-color: #1b202920;
    color: #1b2029;
  }
`

export const ExampleImage = styled.img `
width: 400px;
`

export const Icon = styled(FontAwesomeIcon) `

`