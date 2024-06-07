import styled from "styled-components";

export const MainContainer = styled.div `
  margin-top: 100px;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

export const Title = styled.h1 `
  @media (max-width: 768px) {
    text-align: center;
  }
`

export const VideoContainer = styled.iframe `
  width: 60%;
  height: 100%;
  border-radius: 20px;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (max-width: 768px) {
    width: 90%;
  }
`