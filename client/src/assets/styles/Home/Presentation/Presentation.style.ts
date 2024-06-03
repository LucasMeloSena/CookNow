import styled from "styled-components";

export const MainContainer = styled.div `
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
`

export const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const Title = styled.h1 `

`

export const SubTitle = styled.h4 `
  font-weight: 400;
`

export const ExampleImage = styled.img `
width: 500px;
height: 500px;
`

export const PassosImage = styled.img `
position: absolute;
z-index: -1;
`
