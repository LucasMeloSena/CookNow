import styled from "styled-components";

export const MainContainer = styled.div `
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 20px;
  }
`

export const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    text-align: center;
  }
`

export const ExampleImage = styled.img `
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`

export const Title = styled.h1 `
  @media (max-width: 768px) {
    line-height: 1;
    margin-bottom: 25px !important;
  }
`

export const SubTitle = styled.h4 `
  font-weight: 400;
  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`