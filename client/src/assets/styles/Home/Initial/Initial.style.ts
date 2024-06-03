import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
  padding: 40px 40px;
`;

export const PresentationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  padding: 60px;
  overflow: hidden;

  &::before {
    content: "";
    background-image: url("https://media.gazetadopovo.com.br/sites/2/2021/03/08185953/influencia-cozinhas-cozinhando-fome-960x540.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    z-index: -1;
  }
`;

export const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  color: #1b2029;
  font-size: 52px;
  line-height: 0.9;
  width: 40%;
  font-weight: 600;
`;

export const SubTitle = styled.h5`
  border-radius: 10px;
  font-family: Poppins;
  color: #1b2029;
  font-weight: 400;
  width: 40%;
  font-size: 16px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

export const Btn = styled.button`
  border-radius: 10px;
  font-family: Poppins;
  background-color: #1b2029a8;
  color: #fff;
  border: none;
  padding: 10px 40px;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transition: all 0.5s;
    background-color: #1b202920;
    color: #fff;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;
