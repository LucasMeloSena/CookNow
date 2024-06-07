import styled from "styled-components";

export const MainContainer = styled.div `
  margin-top: 100px;
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    height: 100%;
  }
`

export const ContainerRecipes = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80%;
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`

export const Title = styled.h1 `
  @media (max-width: 768px) {
   text-align: center;
  }
`