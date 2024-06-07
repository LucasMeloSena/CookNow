import styled from "styled-components";

export const MainContainer = styled.div `
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    text-align: center;
  }
`

export const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const Title = styled.h1 `
  @media (max-width: 768px) {
    line-height: 1;
  }
`

export const SubTitle = styled.h4 `
  font-weight: 400;
`

export const ExampleImage = styled.img `
width: 500px;
height: 500px;
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`

export const PassosImage = styled.img `
position: absolute;
z-index: -1;
  @media (max-width: 768px) {
    display: none;
  }
`
