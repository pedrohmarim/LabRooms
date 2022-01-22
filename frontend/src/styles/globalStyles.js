import { createGlobalStyle } from "styled-components";
import { darkPallete } from "../styles/pallete";

const { white } = darkPallete;

export const GlobalStyles = createGlobalStyle`
  .ant-spin-dot-item{
    background-color: ${white} !important
  }

  * {
    font-family: 'Roboto', sans-serif;
  }

  body{
    overflow-x: hidden !important;
    background-color: #000;
  }

  #video-container {
    height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
  }
`;
