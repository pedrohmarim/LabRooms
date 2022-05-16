import styled from "styled-components";
import { Input as InputStyled, Form } from "antd";

export const Input = styled(InputStyled)`
  border: none;
  background-color: ${({ background }) => background};
  width: ${({ width }) => width} !important;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  outline: none;

  .ant-input {
    background-color: ${({ background }) => background};
  }

  .ant-input::placeholder {
    color: #000 !important;
    opacity: 0.7 !important;
  }
`;

export const FormItem = styled(Form.Item)`
  .ant-input-affix-wrapper {
    width: ${({ width }) => `${width}px`} !important;
  }
`;
