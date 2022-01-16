import { createGlobalStyle } from "styled-components";
import { darkPallete } from "../styles/pallete";

const { greenText, darkBackground } = darkPallete;

export const GlobalStyles = createGlobalStyle`
  .ant-spin-dot-item{
    background-color: ${greenText} !important
  }

  * {
    font-family: 'Roboto', sans-serif;
  }

  body{
    background-color: ${darkBackground};
  }
`;
