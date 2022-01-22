import styled from "styled-components";
import { Input } from "antd";

export const InputStyled = styled(Input)`
  border: none;
  margin-top: 15px;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  outline: none;
  background-color: ${({ background }) => background};

  .ant-input {
    background-color: ${({ background }) => background};
  }

  .ant-input::placeholder {
    color: #000;
    opacity: 0.7;
  }
`;
