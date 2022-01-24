import styled from "styled-components";
import { Input } from "antd";

export const InputStyled = styled(Input)`
  width: ${({ width }) => width} !important;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  outline: none;
  background-color: #fff;

  .ant-input {
    background-color: #fff;
  }

  .ant-input::placeholder {
    color: #000 !important;
    opacity: 0.7 !important;
  }
`;
