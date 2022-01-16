import styled from "styled-components";
import { Button as AntDesignButton } from "antd";

export const Button = styled(AntDesignButton)`
  color: ${({ color }) => color};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  outline: none;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
  font-weight: bold;
  font-size: 12pt;
  opacity: 1;

  &&:hover,
  &&:focus {
    color: ${({ color }) => color} !important;
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    border: none;
    opacity: 0.9;
    cursor: pointer;
  }
`;
