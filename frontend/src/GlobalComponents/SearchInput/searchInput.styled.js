import styled from "styled-components";
import { Input as InputStyled, Form } from "antd";

export const Input = styled(InputStyled)`
  border: none;
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

export const FormItem = styled(Form.Item)`
  .ant-input-affix-wrapper {
    width: ${({ width }) => `${width}px`} !important;
  }
`;
