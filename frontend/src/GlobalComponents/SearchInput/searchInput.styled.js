import styled from "styled-components";
import { Input } from "antd";

export const InputStyled = styled(Input.Search)`
  width: ${({ width }) => width} !important;
  height: 40px;
  width: 100%;
  border-radius: 8px 0 0 8px;
  outline: none;
  background-color: ${({ background }) => background};

  .ant-input {
    background-color: ${({ background }) => background};
  }

  .ant-input::placeholder {
    color: #000 !important;
    opacity: 0.7 !important;
  }
`;
