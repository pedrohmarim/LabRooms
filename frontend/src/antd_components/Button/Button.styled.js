import styled from "styled-components";
import { Button as AntDesignButton } from "antd";

export const Button = styled(AntDesignButton)`
  color: ${({ hovercolor }) => hovercolor};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  outline: none;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
  font-weight: bold;
  font-size: 12pt;
  margin: 100px;
  opacity: 1;

  &&:hover,
  &&:focus {
    color: ${({ hovercolor }) => hovercolor} !important;
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    border: none;
    opacity: 0.9;
    cursor: pointer;
  }
`;
