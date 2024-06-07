import styled from "styled-components";

interface BackgroundImageProps {
  imageUrl: string;
}

export const MainContainer = styled.div<BackgroundImageProps> `
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    width: 350px;
    height: 300px;
  }
`