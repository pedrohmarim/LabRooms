import styled from "styled-components";
import { Button as AntDesignButton } from "antd";

export const Button = styled(AntDesignButton)`
  && {
    margin-left: ${({ ml }) => ml}px;
    margin-right: ${({ mr }) => mr}px;
    color: ${({ color }) => color};
  }
`;
