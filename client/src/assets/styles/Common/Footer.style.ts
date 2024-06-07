import styled from "styled-components";

export const MainContainer = styled.footer `
  margin-top: 100px;
  width: 100%;
  height: 15vh;
  background-color: #ecd09b3d;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

export const Copywrite = styled.h3 `
  font-weight: 500;
  @media (max-width: 768px) {
   text-align: center;
   line-height: 1;
   margin-bottom: 5px !important;
   font-size: 15px;
  }
`

export const Text = styled.h4 `
  font-weight: 400;
  font-size: 14px;
`