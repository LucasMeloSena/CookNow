import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: Poppins !important;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background-color: #ecd09b3b;
}

body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-thumb {
  background-color: #ECD09B;
  border-radius: 4px;
}

body::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0 !important;
  padding: 0 !important;
}
`;