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

  a {
    color: #000;
  }

  body {
    overflow-x: hidden !important;
    background-color: #000;
  }

  #video-container {
    height: 100vh;
  }

  #video-form {
    width: 100%;
    position: fixed;
    z-index: -1 !important;
  }

  @media screen and (max-width: 1024px) {
    #video-form-mobile {
      height: 100vh;
      position: fixed;
      z-index: -1 !important;
    }
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
  }

  .expandText {
    white-space: initial !important;
  }

  .szh-menu{
    left: -128px !important;
  }

  .iconMargin {
    margin-top: 6px;
  }

  .iconMarginRight {
    margin-right: 4px;
  }

  .ant-dropdown, .ant-notification {
    z-index: 9999 !important;
  }

  .disabled {
    pointer-events: none; 
  }
  
  .alert-icon {
    color: red;
  }
`;
